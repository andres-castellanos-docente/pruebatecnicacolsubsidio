import {Component, OnInit, ViewChild} from '@angular/core';
import {subirAnimation} from '../../../animations/listanim.animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AppCargandoService} from '../../../appBase/cargando/app.cargando.service';
import {ClientesService} from '../../services/clientes.service';
import {ClientesModel} from '../../models/clientes.model';
import {MatDialog} from '@angular/material/dialog';
import {DialogMessagesComponent} from '../../../appBase/messagesdialog/diagmessages.component';
import {DialogCreatClientesComponent} from './dialog-creat-clientes/dialog-creat-clientes.component';
import {DialogConfComponent} from '../../../appBase/confdialog/diagconf.component';
import {CreateEdClienteResponse} from "../../responses/listResponses";
import {DialogCuentasComponent} from "./dialog-cuentas/dialog-cuentas.component";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  animations: [subirAnimation]
})
export class ClientesComponent implements OnInit {
  dataClientes!: ClientesModel[];
  dataSource!: MatTableDataSource<ClientesModel>;
  displayedColumns: string[] = ['editar', 'pnombre', 'snombre', 'papellido', 'sapellido', 'direccion', 'telefono', 'cuentas', 'eliminar'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  indexElEd: number = -1;

  constructor(private clientesService: ClientesService, private cargServ: AppCargandoService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cargServ.iniciarCargando();
    this.clientesService.listarClientes().subscribe({
      next: (v) => {
        const response = v as any;
        this.dataClientes = response.clientes;
        this.dataSource = new MatTableDataSource<ClientesModel>(this.dataClientes);
        this.dataSource.paginator = this.paginator;

        this.cargServ.detenCargando();
      },
      error: (e) => {
        this.DialogMsg('Ocurrió un error al Cargar los Clientes 😅', 'Error', '320px', '632px'),this.cargServ.detenCargando()
      }
    });
  }

  eliminar(ClienteEl: ClientesModel, indexEl: number): void {
    // Se debe que validar la página actual para tomar el índice correcto a eliminar
    const pagact = this.paginator.pageIndex;
    pagact === 0 ? (this.indexElEd = indexEl) : (this.indexElEd = (this.paginator.pageSize * pagact) + indexEl);

    const dialogRef = this.dialog.open(DialogConfComponent, {
      minWidth: '320px', maxWidth: '532px', data: {
        message: '🤔 ¿Desea Eliminar el Cliente ' + ClienteEl.pnombre + ' ' + ClienteEl.papellido + '?',
        idClienteElim: ClienteEl.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // Se verifica si es diferente de nil para evitar error que ocurre al oprimir Esc
      result!.result ? (
        this.cargServ.iniciarCargando(),
          this.clientesService.eliminarCliente(ClienteEl?.id).subscribe({
            next: (v) => {
              const response: CreateEdClienteResponse = v as any;
              this.cargServ.detenCargando();
              (response.responseCode === 1) ? (
                this.DialogMsg('Cliente Eliminado 😌', 'Información', '320px', '632px'),
                  this.dataClientes?.splice(this.indexElEd, 1),
                  this.dataSource = new MatTableDataSource<ClientesModel>(this.dataClientes),
                  this.dataSource.paginator = this.paginator
              ) : (
                this.DialogMsg(response.responseDescription + ' 😅', 'Error', '320px', '632px')
              )
            },
            error: (e) => {
              this.DialogMsg('Ocurrió un error al Eliminar el Cliente 😅', 'Error', '320px', '632px'),
                this.cargServ.detenCargando()
            }
          })) : ('');
    });
  }

  public DialogMsg(mensage: string, title: string, minwidth: string, maxWidth: string): void {
    this.dialog.open(DialogMessagesComponent, {
      minWidth: minwidth,
      maxWidth: maxWidth,
      data: {message: mensage, title: title}
    });
  }

  vercuentas(ClienteEd: ClientesModel, indexEd: number): void {
    this.dialog.open(DialogCuentasComponent, {
      minWidth: '520px',
      maxWidth: '832px',
      data: {data: ClienteEd}
    });
  }

  editar(ClienteEd: ClientesModel, indexEd: number): void {
    // Se debe que validar la página actual para tomar el índice correcto a editar
    const pagact = this.paginator.pageIndex;
    (pagact === 0) ? (this.indexElEd = indexEd) : (this.indexElEd = (this.paginator.pageSize * pagact) + indexEd);
    const dialogRef = this.dialog.open(DialogCreatClientesComponent, {
      minWidth: '320px', maxWidth: '490px',
      data: {dataed: ClienteEd}
    });
    dialogRef.afterClosed().subscribe(result => {
      // Se verifica si es diferente de nil para evitar error que ocurre al oprimir Esc
      (result) && (result.result) && (result.dataAdEd) && (this.dataClientes) ? (
        this.DialogMsg('Cliente Editado 😃', 'Información', '320px', '632px'),
          this.dataClientes[this.indexElEd] = result.dataAdEd,
          this.dataSource = new MatTableDataSource<ClientesModel>(this.dataClientes),
          this.dataSource.paginator = this.paginator
      ) : ('');
    });
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(DialogCreatClientesComponent, {
      minWidth: '320px', maxWidth: '490px',
      data: {dataed: null}
    });
    dialogRef.afterClosed().subscribe(result => {
      // Se verifica si es diferente de nil para evitar error que ocurre al oprimir Esc
      ((result) && (result.result) && (result.dataAdEd)) ? (
        this.DialogMsg('Cliente Creado 😃', 'Información', '320px', '632px'), this.dataClientes?.push(result.dataAdEd),
          this.dataSource = new MatTableDataSource<ClientesModel>(this.dataClientes),
          this.dataSource.paginator = this.paginator
      ) : ('');
    });
  }
}
