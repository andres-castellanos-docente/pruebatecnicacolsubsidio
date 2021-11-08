import {Injectable, SkipSelf} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ClientesModel} from '../models/clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) {
  }

  path = 'cliente';


  listarClientes(): Observable<any> {
    return this.http.get(environment.apiUrl + this.path, {});
  }

  crearCliente(request: ClientesModel): Observable<any> {
    return this.http.post(environment.apiUrl + this.path, request, {});
  }

  editarCliente(request: ClientesModel): Observable<any> {
    return this.http.put(environment.apiUrl + this.path + '/' + request.id?.toString(), request, {});
  }

  eliminarCliente(idElim: number | null): Observable<any> {
    return this.http.delete(environment.apiUrl + this.path + '/' + idElim?.toString(), {});
  }

}
