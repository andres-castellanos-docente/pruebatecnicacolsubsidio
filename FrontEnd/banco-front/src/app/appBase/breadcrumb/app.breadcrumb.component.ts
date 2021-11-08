import {Component, OnInit} from '@angular/core';
import { derAIzAnimation} from '../../animations/listanim.animations';
import {Observable} from 'rxjs';
import {ValorReloj, XsegundoService} from './xsegundo.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html', styleUrls: ['./app.breadcrumb.scss'],
    animations: [derAIzAnimation]
})
export class AppBreadCrumbComponent implements OnInit{

  datos$: Observable<ValorReloj>| undefined;
  hora: number | undefined;
  minutos: string| undefined;
  dia: string| undefined;
  fecha: string| undefined;
  ampm: string| undefined;
  segundos: string| undefined;


  constructor(private segundo: XsegundoService) {
  }

  ngOnInit(): void {
    this.datos$ = this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutes;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo;
    });
  }

}
