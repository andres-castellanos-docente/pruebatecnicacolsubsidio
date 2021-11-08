import {CuentasModel} from "./cuentas.model";

export class ClientesModel {
  id: number | null;
  pnombre: string | null;
  papellido: string | null;
  snombre: string | null;
  sapellido: string | null;
  direccion: string | null;
  telefono: number | null;
  cuentasByCliente: CuentasModel[] | null;
  constructor(json: any = null, ed: boolean) {
    if (json !== null) {
      this.id = json.id;
      this.pnombre = json.pnombre;
      this.papellido = json.papellido;
      this.snombre = json.snombre;
      this.sapellido = json.sapellido;
      this.direccion = json.direccion;
      this.telefono = json.telefono;
      this.cuentasByCliente = json.cuentasByCliente;
    } else {
      this.id = null;
      this.pnombre = null;
      this.papellido = null;
      this.snombre = null;
      this.sapellido = null;
      this.direccion = null;
      this.telefono = null;
      this.cuentasByCliente = null;
    }
  }
}
