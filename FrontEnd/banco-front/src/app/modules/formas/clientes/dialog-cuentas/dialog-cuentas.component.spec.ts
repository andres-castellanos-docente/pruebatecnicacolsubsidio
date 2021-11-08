import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCuentasComponent } from './dialog-cuentas.component';
import {MatDialog} from "@angular/material/dialog";
import {SharedModule} from "../../../../SharedModule";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CuentasService} from "../../../services/cuentas.service";

describe('DialogCuentasComponent', () => {
  let component: DialogCuentasComponent;
  let fixture: ComponentFixture<DialogCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCuentasComponent ],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [CuentasService,
        { provide: MatDialog }
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
