import {Injectable, SkipSelf} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ReporteModel} from "../models/reporte.model";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {DatePipe, DecimalPipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(public decimalpipe: DecimalPipe, public datepipe: DatePipe, private http: HttpClient) {
  }

  path = 'reporte';

  buscarCuenta(request: ReporteModel): Observable<any> {
    return this.http.post(environment.apiUrl + this.path, request, {});
  }

  listarClientesRep(): Observable<any> {
    const path = 'clienterep';
    return this.http.get(environment.apiUrl + path, {});
  }

  generarReporte(cuentasFind: any): any {
    if (cuentasFind?.length>0) {
      let PDF = new jsPDF('p', 'mm', 'letter');
      PDF.setFontSize(12);
      PDF.text('Reporte Movimientos', PDF.internal.pageSize.getWidth() / 2, 10, {align: "center"});
      let startY = null;
      let any = this;
      cuentasFind?.forEach(function (item: any) {
        const cuenta: any = item.numero;
        const saldo: any =  '$ ' + any.decimalpipe.transform(item.saldo);
        const movimientos: any = item.movimientosByCuenta;
        let formatMovimientos = [];

        for (let i = 0; i < movimientos.length; i++) {
          formatMovimientos.push({
            debito: movimientos[i].debito ? "Débito" : "Crédito",
            valor: '$ ' + any.decimalpipe.transform(movimientos[i].valor),
            fecha: any.datepipe.transform(movimientos[i].fecha, 'dd/MM/yyyy hh:mm:ss a')
          });
        }
        startY = (!(PDF as any).lastAutoTable.finalY) ? 10 : (PDF as any).lastAutoTable.finalY;
        autoTable(PDF, {
          startY: startY + 10,
          headStyles: {halign: 'center'},
          columnStyles: {1: {halign: 'right'}},
          columns: [
            {header: 'Cuenta', dataKey: 'Cuenta'},
            {header: 'Saldo', dataKey: 'Saldo'},
          ],
          body: [
            {Cuenta: cuenta.toString(), Saldo: saldo.toString()},
          ],
        });
        autoTable(PDF, {
          startY: (PDF as any).lastAutoTable.finalY,
          columnStyles: {2: {halign: 'right'}},
          columns: [
            {header: 'Tipo', dataKey: 'debito'},
            {header: 'Fecha', dataKey: 'fecha'},
            {header: 'Valor', dataKey: 'valor'},
          ],
          body: formatMovimientos,
        });
      });
      for (let j = 1; j < PDF.getNumberOfPages() + 1; j++) {
        PDF.setPage(j);
        PDF.text(`${j} de ${PDF.getNumberOfPages()}`, PDF.internal.pageSize.getWidth() - 12, PDF.internal.pageSize.getHeight() - 4, {align: 'center'});
      }
      return PDF;
    }
  }
}
