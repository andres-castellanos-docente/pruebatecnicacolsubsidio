
export class ReporteModel {
  id_cliente: number | null;
  fechadesde: Date | null;
  fechahasta: Date | null;
  constructor(json: any = null, ed: boolean) {
    if (json !== null) {
      this.id_cliente = json.id_cliente;
      this.fechadesde = new Date(json.fechadesde.setHours(0, 0, 0, 0));
      this.fechahasta = new Date(json.fechahasta.setHours(23, 59, 59, 999));
    } else {
      this.id_cliente = null;
      this.fechadesde = null;
      this.fechahasta = null;
    }
  }
}
