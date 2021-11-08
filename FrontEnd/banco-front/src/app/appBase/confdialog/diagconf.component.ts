import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-diagconf-component',
  templateUrl: 'diagconf.component.html'
})
export class DialogConfComponent {
  message: string;
  idClienteElim: number;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<DialogConfComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
    this.idClienteElim = data.idClienteElim;
  }

  public Cerrar(resultad: boolean): void {
    let resultado: any;
    resultado = {result: resultad};
    this.dialogRef.close(resultado);
  }

  public Aceptar(): void {
    this.Cerrar(true);
  }
}

