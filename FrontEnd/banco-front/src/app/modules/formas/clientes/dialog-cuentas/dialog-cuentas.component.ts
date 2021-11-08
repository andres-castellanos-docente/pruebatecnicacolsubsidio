import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppCargandoService} from "../../../../appBase/cargando/app.cargando.service";
import {MatTableDataSource} from "@angular/material/table";
import {CuentasModel} from "../../../models/cuentas.model";
import {MatPaginator} from "@angular/material/paginator";
import {DialogCreatCuentasComponent} from "./dialog-creat-cuentas/dialog-creat-cuentas.component";
import {DialogMessagesComponent} from "../../../../appBase/messagesdialog/diagmessages.component";
import {DialogConfComponent} from "../../../../appBase/confdialog/diagconf.component";
import {CreateEdClienteResponse} from "../../../responses/listResponses";
import {CuentasService} from "../../../services/cuentas.service";
import {DialogRegMovimientoComponent} from "./dialog-reg-movimiento/dialog-reg-movimiento.component";

@Component({
  selector: 'app-dialog-cuentas',
  templateUrl: './dialog-cuentas.component.html',
  styleUrls: ['./dialog-cuentas.component.scss']
})
export class DialogCuentasComponent implements AfterViewInit {
  idCliente: number | undefined;
  qualifies: CuentasModel[];
  cuentaSel!: CuentasModel;
  dataSource!: MatTableDataSource<CuentasModel>;
  indexElEd: number = -1;
  displayedColumns: string[] = ['editar', 'numero', 'saldo', 'regmovim', 'eliminar'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog,
              private cuentasService: CuentasService,
              @Inject(MAT_DIALOG_DATA) public data: any, private cargServ: AppCargandoService,
              public dialogRef: MatDialogRef<DialogCuentasComponent>) {
    this.idCliente = data.data.id;
    this.qualifies = data.data.cuentasByCliente;
    this.dataSource = new MatTableDataSource<CuentasModel>(this.qualifies);
  }

  public Cerrar(resultad: boolean): void {
    let resultado: any;
    resultado = {result: resultad};
    this.dialogRef.close(resultado);
  }

  regMovimiento(cuentaRegMov: CuentasModel, indexCueMov: number): void {
    const pagact = this.paginator.pageIndex;
    pagact === 0 ? (this.indexElEd = indexCueMov) : (this.indexElEd = (this.paginator.pageSize * pagact) + indexCueMov);

    const dialogRef = this.dialog.open(DialogRegMovimientoComponent, {
      minWidth: '320px',
      maxWidth: '832px',
      data: {dataed: {id_cuenta: cuentaRegMov.id},saldoAct: cuentaRegMov.saldo, numCuenta: cuentaRegMov.numero}
    });
    this.cuentaSel = cuentaRegMov;
    dialogRef.afterClosed().subscribe(result => {
      ((result) && (result.result) && (result.dataAdEd)) ? (
        (this.cuentaSel)? (
          this.cuentaSel.saldo = result.nuevoSaldo
        ) : (
          ''),
        this.DialogMsg('Movimiento Registrado 😃', 'Información', '320px', '632px'),
          this.qualifies[this.indexElEd] = this.cuentaSel,
          this.dataSource = new MatTableDataSource<CuentasModel>(this.qualifies),
          this.dataSource.paginator = this.paginator) : ('')
    });
  }

  eliminar(CuentaEL: CuentasModel, indexEl: number): void {
    // Se debe que validar la página actual para tomar el índice correcto a eliminar
    const pagact = this.paginator.pageIndex;
    pagact === 0 ? (this.indexElEd = indexEl) : (this.indexElEd = (this.paginator.pageSize * pagact) + indexEl);

    const dialogRef = this.dialog.open(DialogConfComponent, {
      minWidth: '320px', maxWidth: '532px', data: {
        message: '🤔 ¿Desea Eliminar la Cuenta Número ' + CuentaEL.numero + '?',
        idClienteElim: CuentaEL.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // Se verifica si es diferente de nil para evitar error que ocurre al oprimir Esc
      result!.result ? (
        this.cargServ.iniciarCargando(),
          this.cuentasService.eliminarCuenta(CuentaEL?.id).subscribe({
            next: (v) => {
              const response: CreateEdClienteResponse = v as any;
              this.cargServ.detenCargando();
              (response.responseCode === 1) ? (
                this.DialogMsg('Cuenta Eliminada 😌', 'Información', '320px', '632px'),
                  this.qualifies?.splice(this.indexElEd, 1),
                  this.dataSource = new MatTableDataSource<CuentasModel>(this.qualifies),
                  this.dataSource.paginator = this.paginator
              ) : (
                this.DialogMsg(response.responseDescription + ' 😅', 'Error', '320px', '632px')
              )
            },
            error: (e) => {
              this.DialogMsg('Ocurrió un error al Eliminar la Cuenta 😅', 'Error', '320px', '632px'),
                this.cargServ.detenCargando()
            }
          })) : ('');
    });
  }

  editar(CuentaEd: CuentasModel, indexEd: number): void {
// Se debe que validar la página actual para tomar el índice correcto a editar
    const pagact = this.paginator.pageIndex;
    (pagact === 0) ? (this.indexElEd = indexEd) : (this.indexElEd = (this.paginator.pageSize * pagact) + indexEd);
    const CueEd: any = CuentaEd;
    CueEd.idCliente = this.idCliente;
    const dialogRef = this.dialog.open(DialogCreatCuentasComponent, {
      minWidth: '320px', maxWidth: '490px',
      data: {dataed: CueEd}
    });
    dialogRef.afterClosed().subscribe(result => {
      // Se verifica si es diferente de nil para evitar error que ocurre al oprimir Esc
      (result) && (result.result) && (result.dataAdEd) && (this.qualifies) ? (
        this.DialogMsg('Cuenta Editada 😃', 'Información', '320px', '632px'),
          this.qualifies[this.indexElEd] = result.dataAdEd,
          this.dataSource = new MatTableDataSource<CuentasModel>(this.qualifies),
          this.dataSource.paginator = this.paginator
      ) : ('');
    });
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(DialogCreatCuentasComponent, {
      minWidth: '320px',
      maxWidth: '832px',
      data: {dataed: {idCliente: this.idCliente}}
    });
    dialogRef.afterClosed().subscribe(result => {
      // Se verifica si es diferente de nil para evitar error que ocurre al oprimir Esc
      ((result) && (result.result) && (result.dataAdEd)) ? (
        this.DialogMsg('Cuenta Creada 😃', 'Información', '320px', '632px'),
          this.qualifies?.push(result.dataAdEd)) : (''),
        this.dataSource = new MatTableDataSource<CuentasModel>(this.qualifies),
        this.dataSource.paginator = this.paginator
    });
  }

  public DialogMsg(mensage: string, title: string, minwidth: string, maxWidth: string): void {
    this.dialog.open(DialogMessagesComponent, {
      minWidth: minwidth,
      maxWidth: maxWidth,
      data: {message: mensage, title: title}
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
