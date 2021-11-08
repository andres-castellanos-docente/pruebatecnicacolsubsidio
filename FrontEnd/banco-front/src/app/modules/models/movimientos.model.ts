export class MovimientosModel {
  id_cuenta: number | null;
  id: number | null;
  debito: boolean | null;
  fecha: Date | null;
  valor: number | null;
  constructor(json: any = null, ed: boolean) {
    if (json !== null) {
      this.id_cuenta = json.id_cuenta;
      this.id = json.id;
      this.debito = json.debito;
      this.fecha = json.fecha;
      this.valor = json.valor;
    } else {
      this.id_cuenta = null;
      this.id = null;
      this.debito = null;
      this.fecha = null;
      this.valor = null;
    }
  }
}
