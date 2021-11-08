import {Injectable, SkipSelf} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MovimientosModel} from "../models/movimientos.model";

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor( private http: HttpClient) {
  }

  path = 'movimiento';

  crearMovimiento(request: MovimientosModel): Observable<any> {
    return this.http.post(environment.apiUrl + this.path, request, {});
  }


}
