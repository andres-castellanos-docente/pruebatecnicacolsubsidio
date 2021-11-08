import { NgModule } from '@angular/core';
import {AppMaterialModule} from './app.material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
  imports:      [ AppMaterialModule,   ReactiveFormsModule,
    FormsModule, HttpClientModule, CommonModule, PdfViewerModule],
  declarations: [
],
  exports:      [
    AppMaterialModule,   ReactiveFormsModule,
    FormsModule,  HttpClientModule,     CommonModule, PdfViewerModule]
})
export class SharedModule { }
