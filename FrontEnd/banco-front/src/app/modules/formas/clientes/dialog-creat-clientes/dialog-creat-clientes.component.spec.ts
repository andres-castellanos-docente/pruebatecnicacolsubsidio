import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogCreatClientesComponent } from './dialog-creat-clientes.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../../../SharedModule";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DialogCreatClientesComponent', () => {
  let component: DialogCreatClientesComponent;
  let fixture: ComponentFixture<DialogCreatClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreatClientesComponent ],
      imports: [SharedModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreatClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
