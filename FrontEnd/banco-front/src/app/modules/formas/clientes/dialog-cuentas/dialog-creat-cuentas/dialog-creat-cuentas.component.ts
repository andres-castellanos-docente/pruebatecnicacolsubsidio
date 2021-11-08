import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientesModel} from "../../../../models/clientes.model";
import {CuentasModel} from "../../../../models/cuentas.model";
import { CreateEdCuentaResponse} from "../../../../responses/listResponses";
import {AppCargandoService} from "../../../../../appBase/cargando/app.cargando.service";
import {CuentasService} from "../../../../services/cuentas.service";
import {DialogMessagesComponent} from "../../../../../appBase/messagesdialog/diagmessages.component";

@Component({
  selector: 'app-dialog-creat-cuentas',
  templateUrl: './dialog-creat-cuentas.component.html',
  styleUrls: ['./dialog-creat-cuentas.component.scss']
})
export class DialogCreatCuentasComponent {
  selectedCuenta: CuentasModel;
  dataAdEd: CuentasModel | undefined;
  cuentaForm: FormGroup;
  cuentaSubmited: boolean | undefined;

  constructor(public dialogRef: MatDialogRef<DialogCreatCuentasComponent>, private builder: FormBuilder,
              private cargServ: AppCargandoService,
              private cuentasService: CuentasService, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedCuenta = data.dataed === null ? new CuentasModel(null, false) : new CuentasModel(data.dataed, false);
    this.cuentaForm = this.builder.group({
      id: [this.selectedCuenta.id, []],
      idCliente: [this.selectedCuenta.idCliente, []],
      numero: [this.selectedCuenta.numero, [Validators.required, Validators.maxLength(80)]]
    });
  }

  onSubmitCrear(): void {
    this.cuentaSubmited = true;
    if (this.cuentaForm!.invalid) {
      return;
    }
    const cuentaModelEnv = new CuentasModel(this.cuentaForm!.value, true);
    this.cargServ.iniciarCargando();
    this.data.dataed.id === undefined ? (
      this.cuentasService.crearCuenta(cuentaModelEnv).subscribe({
        next: (v) => {
          const response: CreateEdCuentaResponse = v as any;
          this.cargServ.detenCargando();
          response.responseCode === 1 ? (
              this.dataAdEd = response.cuenta, this.Cerrar(true)) :
            (this.DialogMsg('Ocurrió un error al Crear la Cuenta 😅', 'Error', '320px', '632px'));
        },
        error: (e) => {
          this.DialogMsg('Ocurrió un error al Crear la Cuenta 😅', 'Error', '320px', '632px'),
            this.cargServ.detenCargando()
        }
      })
    ) : (
      this.cuentasService.editarCuenta(cuentaModelEnv).subscribe({
        next: (v) => {
          const response: CreateEdCuentaResponse = v as any;
          this.cargServ.detenCargando();
          response.responseCode === 1 ? (
              this.dataAdEd = response.cuenta, this.Cerrar(true)) :
            (this.DialogMsg('Ocurrió un error al Editar la Cuenta 😅', 'Error', '320px', '632px'));
        },
        error: (e) => {
          this.DialogMsg('Ocurrió un error al Editar la Cuenta 😅', 'Error', '320px', '632px'),
            this.cargServ.detenCargando()
        }
      }));
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
    resultado = resultad ? {result: resultad, dataAdEd: this.dataAdEd} : {result: resultad, dataAdEd: null};
    this.dialogRef.close(resultado);
  }
}
