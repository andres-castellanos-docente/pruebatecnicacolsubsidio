import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogMessagesComponent} from "../../../../../appBase/messagesdialog/diagmessages.component";
import {CreateEdMovimientoResponse} from "../../../../responses/listResponses";
import {AppCargandoService} from "../../../../../appBase/cargando/app.cargando.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MovimientosModel} from "../../../../models/movimientos.model";
import {MovimientosService} from "../../../../services/movimientos.service";

@Component({
  selector: 'app-dialog-reg-movimiento',
  templateUrl: './dialog-reg-movimiento.component.html',
  styleUrls: ['./dialog-reg-movimiento.component.scss']
})

export class DialogRegMovimientoComponent {
  selectedCuenta: MovimientosModel;
  saldoAct: number | undefined;
  numCuenta: number | undefined;
  nuevoSaldo: number | undefined;
  dataAdEd: MovimientosModel | undefined;
  movimientoForm: FormGroup;
  movimientoSubmited: boolean | undefined;

  constructor(public dialogRef: MatDialogRef<DialogRegMovimientoComponent>, private builder: FormBuilder,
              private cargServ: AppCargandoService,
              private movimientosService: MovimientosService, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.saldoAct = data.saldoAct;
    this.numCuenta = data.numCuenta;
    this.selectedCuenta = data.dataed === null ? new MovimientosModel(null, false) : new MovimientosModel(data.dataed, false);
    this.movimientoForm = this.builder.group({
      id: [this.selectedCuenta.id, []],
      debito: [this.selectedCuenta.debito, [Validators.required]],
      id_cuenta: [this.selectedCuenta.id_cuenta, []],
      valor: [this.selectedCuenta.valor, [Validators.required, Validators.maxLength(80)]]
    });
  }

  onSubmitRegistrar(): void {
    this.movimientoSubmited = true;
    if (this.movimientoForm!.invalid) {
      return;
    }
    const cuentaModelEnv = new MovimientosModel(this.movimientoForm!.value, true);
    this.cargServ.iniciarCargando();
    this.data.dataed.id === undefined ? (
      this.movimientosService.crearMovimiento(cuentaModelEnv).subscribe({
        next: (v) => {
          const response: CreateEdMovimientoResponse = v as any;
          this.cargServ.detenCargando();
          response.responseCode === 1 ? (
              this.nuevoSaldo = response.nuevoSaldo,
                this.dataAdEd = response.movimientos, this.Cerrar(true)) :
            (this.DialogMsg( response.responseDescription[0], 'Error', '320px', '632px'));
        },
        error: (e) => {
          this.DialogMsg('Ocurrió un error al Registrar Movimiento 😅', 'Error', '320px', '632px'),
            this.cargServ.detenCargando()
        }
      })
    ) : (
      '');
  }

  public DialogMsg(mensage: string, title: string, minwidth: string, maxWidth: string): void {
    this.dialog.open(DialogMessagesComponent, {
      minWidth: minwidth,
      maxWidth: maxWidth,
      data: {message: mensage, title: title}
    });
  }

  public Cerrar(resultad: boolean): void {
    let resultado: any;
    resultado = resultad ? {
      result: resultad, nuevoSaldo: this.nuevoSaldo,
      dataAdEd: this.dataAdEd
    } : {result: resultad, dataAdEd: null};
    this.dialogRef.close(resultado);
  }
}
