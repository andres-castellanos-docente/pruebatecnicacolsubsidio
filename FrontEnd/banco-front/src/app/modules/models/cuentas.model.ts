import {MovimientosModel} from "./movimientos.model";

export class CuentasModel {
  idCliente: number | null;
  id: number | null;
  numero: number | null;
  saldo: number | null;
  movimientosByCuenta: MovimientosModel[] | null;

  constructor(json: any = null, ed: boolean) {
    if (json !== null) {
      this.idCliente = json.idCliente;
      this.id = json.id;
      this.numero = json.numero;
      this.saldo = json.saldo;
      this.movimientosByCuenta = json.movimientosByCuenta;
    } else {
      this.idCliente = null;
      this.id = null;
      this.numero = null;
      this.saldo = null;
      this.movimientosByCuenta = null;
    }
  }
}
