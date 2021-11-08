import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegMovimientoComponent } from './dialog-reg-movimiento.component';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../../../../SharedModule";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DialogRegMovimientoComponent', () => {
  let component: DialogRegMovimientoComponent;
  let fixture: ComponentFixture<DialogRegMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        MatDialog,
        MatDialogRef,
        { provide: MatDialog }
      ],
      declarations: [ DialogRegMovimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
