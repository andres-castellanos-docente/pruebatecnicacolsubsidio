import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCuentasComponent } from './dialog-cuentas.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SharedModule} from "../../../../SharedModule";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DialogCuentasComponent', () => {
  let component: DialogCuentasComponent;
  let fixture: ComponentFixture<DialogCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCuentasComponent ],
      imports: [SharedModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
