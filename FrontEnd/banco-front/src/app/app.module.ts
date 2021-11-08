import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./SharedModule";
import {AppCargandoComponent} from "./appBase/cargando/app.cargando.component";
import {AppTopBarComponent} from "./appBase/topbar/app.topbar.component";
import {AppBreadCrumbComponent} from "./appBase/breadcrumb/app.breadcrumb.component";
import {AppMenuComponent, AppSubMenuComponent} from "./appBase/menu/app.menu.component";
import {AppFooterComponent} from "./appBase/footer/app.footer.component";
import {AppPrincComponent} from "./appBase/princ/app.princ.component";
import {XsegundoService} from "./appBase/breadcrumb/xsegundo.service";
import {BannerpublicidadService} from "./appBase/topbar/bannerpublicidad.service";
import {DatePipe, DecimalPipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    AppCargandoComponent,
    AppTopBarComponent,
    AppBreadCrumbComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppFooterComponent,
    AppPrincComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [XsegundoService,BannerpublicidadService, DatePipe, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
