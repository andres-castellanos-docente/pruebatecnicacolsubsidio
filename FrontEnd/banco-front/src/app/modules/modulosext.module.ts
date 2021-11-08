import { NgModule } from '@angular/core';
import { ModulosextRoutingModule } from './modulosext-routing.module';
import {SharedModule} from '../SharedModule';
import { ClientesComponent } from './formas/clientes/clientes.component';
import {ClientesService} from './services/clientes.service';
import {DialogMessagesComponent} from '../appBase/messagesdialog/diagmessages.component';
import {DialogConfComponent} from '../appBase/confdialog/diagconf.component';
import { DialogCreatClientesComponent } from './formas/clientes/dialog-creat-clientes/dialog-creat-clientes.component';
import { DialogCuentasComponent } from './formas/clientes/dialog-cuentas/dialog-cuentas.component';
import { DialogCreatCuentasComponent } from './formas/clientes/dialog-cuentas/dialog-creat-cuentas/dialog-creat-cuentas.component';
import {CuentasService} from "./services/cuentas.service";
import { DialogRegMovimientoComponent } from './formas/clientes/dialog-cuentas/dialog-reg-movimiento/dialog-reg-movimiento.component';
import {MovimientosService} from "./services/movimientos.service";
import { ReporteComponent } from './formas/reporte/reporte.component';
import {ReporteService} from "./services/reporte.service";

@NgModule({
  imports: [
    ModulosextRoutingModule,
    SharedModule
  ],
  declarations: [
    ClientesComponent,
    DialogMessagesComponent,
    DialogConfComponent,
    DialogCreatClientesComponent,
    DialogCuentasComponent,
    DialogCreatCuentasComponent,
    DialogRegMovimientoComponent,
    ReporteComponent
  ],
  entryComponents: [],
  providers: [ ClientesService, CuentasService, MovimientosService, ReporteService ]
})
export class ModulosextModule { }
