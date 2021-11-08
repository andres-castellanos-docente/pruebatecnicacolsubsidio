export class ClientesRepModel {
  id: number | null;
  pnombre: string | null;
  papellido: string | null;
  snombre: string | null;
  sapellido: string | null;
  constructor(json: any = null, ed: boolean) {
    if (json !== null) {
      this.id = json.id;
      this.pnombre = json.pnombre;
      this.papellido = json.papellido;
      this.snombre = json.snombre;
      this.sapellido = json.sapellido;
    } else {
      this.id = null;
      this.pnombre = null;
      this.papellido = null;
      this.snombre = null;
      this.sapellido = null;
    }
  }
}
