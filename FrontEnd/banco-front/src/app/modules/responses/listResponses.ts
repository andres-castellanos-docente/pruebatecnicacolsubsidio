import {ClientesModel} from '../models/clientes.model';
import {CuentasModel} from "../models/cuentas.model";
import {MovimientosModel} from "../models/movimientos.model";
import {ReporteModel} from "../models/reporte.model";

export interface CreateEdClienteResponse {
    responseCode: number;
    clientes: ClientesModel;
    responseDescription: string;
}

export interface CreateEdCuentaResponse {
  responseCode: number;
  cuenta: CuentasModel;
  responseDescription: string;
}

export interface CreateEdMovimientoResponse {
  responseCode: number;
  nuevoSaldo: number;
  movimientos: MovimientosModel;
  responseDescription: string[];
}
export interface buscarMovimientoResponse {
  responseCode: number;
  nuevoSaldo: number;
  cuentas: CuentasModel[];
  responseDescription: string[];
}
