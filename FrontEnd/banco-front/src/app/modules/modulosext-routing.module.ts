import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientesComponent} from './formas/clientes/clientes.component';
import {ReporteComponent} from "./formas/reporte/reporte.component";

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent, canActivate: []},
  {path: 'reporte', component: ReporteComponent, canActivate: []},
  {path: '', redirectTo: 'clientes', pathMatch: 'full', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosextRoutingModule {
}
