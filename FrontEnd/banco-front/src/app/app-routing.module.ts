import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPrincComponent} from "./appBase/princ/app.princ.component";

const routes: Routes = [
  {
    path: '', component: AppPrincComponent,
    children: [
      {
        path: 'modulos',
        loadChildren: () => import('./modules/modulosext.module').then(mod => mod.ModulosextModule)
      },
      {path: '', redirectTo: 'modulos', pathMatch: 'full'}], canActivate: [],

  },
  {path: '', redirectTo: 'modulos', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
