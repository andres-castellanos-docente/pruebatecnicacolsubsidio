import {Component, Inject, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ClientesModel} from '../../../models/clientes.model';
import {AppCargandoService} from '../../../../appBase/cargando/app.cargando.service';
import {ClientesService} from '../../../services/clientes.service';
import {DialogMessagesComponent} from '../../../../appBase/messagesdialog/diagmessages.component';
import {CreateEdClienteResponse} from '../../../responses/listResponses';

@Component({
  selector: 'app-dialog-creat-clientes',
  templateUrl: './dialog-creat-clientes.component.html',
  styleUrls: ['./dialog-creat-clientes.component.scss']
})
export class DialogCreatClientesComponent {
  clienteForm: FormGroup;
  dataAdEd: ClientesModel | undefined;
  selectedCliente: ClientesModel;
  clienteSubmited: boolean | undefined;

  constructor(public dialog: MatDialog, private builder: FormBuilder,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private cargServ: AppCargandoService,
              @Optional() public dialogRef: MatDialogRef<DialogCreatClientesComponent>,
              private clientesService: ClientesService) {

    this.selectedCliente = data.dataed === null ? new ClientesModel(null, false) : new ClientesModel(data.dataed, false);
    this.clienteForm = this.builder.group({
      id: [this.selectedCliente.id, []],
      pnombre: [this.selectedCliente.pnombre, [Validators.required, Validators.maxLength(80)]],
      snombre: [this.selectedCliente.snombre, [Validators.maxLength(80)]],
      papellido: [this.selectedCliente.papellido, [Validators.required, Validators.maxLength(80)]],
      sapellido: [this.selectedCliente.sapellido, [Validators.maxLength(80)]],
      direccion: [this.selectedCliente.direccion, [Validators.required, Validators.maxLength(200)]],
      telefono: [this.selectedCliente.telefono, [Validators.required, Validators.maxLength(10),
        Validators.pattern('[0-9]*')]]
    });
  }

  onSubmitCrear(): void {
    this.clienteSubmited = true;
    if (this.clienteForm!.invalid) {
      return;
    }
    const clienteModelEnv = new ClientesModel(this.clienteForm!.value, true);
    this.cargServ.iniciarCargando();
    this.data.dataed === null ? (
      this.clientesService.crearCliente(clienteModelEnv).subscribe({
        next: (v) => {
          const response: CreateEdClienteResponse = v as any;
          this.cargServ.detenCargando();
          response.responseCode === 1 ? (
              this.dataAdEd = response.clientes, this.Close(true)) :
            (this.DialogMsg('Ocurrió un error al Crear el Cliente 😅','Error','320px', '632px'));
        },
        error: (e) => {
          this.DialogMsg('Ocurrió un error al Crear el Cliente 😅','Error','320px', '632px')
            ,this.cargServ.detenCargando()
        }
      })
    ) : (
      this.clientesService.editarCliente(clienteModelEnv).subscribe({
        next: (v) => {
          const response: CreateEdClienteResponse = v as any;
          this.cargServ.detenCargando();
          response.responseCode === 1 ? (
              this.dataAdEd = response.clientes, this.Close(true)) :
            (this.DialogMsg('Ocurrió un error al Editar el Cliente 😅','Error','320px', '632px'));
        },
        error: (e) => {
          this.DialogMsg('Ocurrió un error al Editar el Cliente 😅','Error','320px', '632px')
            ,this.cargServ.detenCargando()
        }
      }));
  }


  public DialogMsg(mensage: string,title: string, minwidth: string, maxWidth: string): void {
    this.dialog.open(DialogMessagesComponent, {minWidth: minwidth, maxWidth: maxWidth, data: {message: mensage, title: title}});
  }

  public Close(resultad: boolean): void {
    let resultado: any;
    resultado = resultad ? {result: resultad, dataAdEd: this.dataAdEd} : {result: resultad, dataAdEd: null};
    this.dialogRef.close(resultado);
  }
}
