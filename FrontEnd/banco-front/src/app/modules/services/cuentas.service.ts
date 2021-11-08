import {Injectable, SkipSelf} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CuentasModel} from "../models/cuentas.model";

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) {
  }

  path = 'cuenta';

  listarCuentas(): Observable<any> {
    return this.http.get(environment.apiUrl + this.path, {});
  }

  crearCuenta(request: CuentasModel): Observable<any> {
    return this.http.post(environment.apiUrl + this.path, request, {});
  }

  editarCuenta(request: CuentasModel): Observable<any> {
    return this.http.put(environment.apiUrl + this.path + '/' + request.id?.toString(), request, {});
  }

  eliminarCuenta(idElim: number | null): Observable<any> {
    return this.http.delete(environment.apiUrl + this.path + '/' + idElim?.toString(), {});
  }

}
