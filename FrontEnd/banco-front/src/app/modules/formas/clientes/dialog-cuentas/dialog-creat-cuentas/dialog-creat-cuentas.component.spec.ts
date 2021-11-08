import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatCuentasComponent } from './dialog-creat-cuentas.component';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../../../../SharedModule";
import {CuentasService} from "../../../../services/cuentas.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogCreatCuentasComponent', () => {
  let component: DialogCreatCuentasComponent;
  let fixture: ComponentFixture<DialogCreatCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [CuentasService
      ],
      declarations: [ DialogCreatCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreatCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
