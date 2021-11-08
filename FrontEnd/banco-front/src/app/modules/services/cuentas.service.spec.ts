import { TestBed } from '@angular/core/testing';

import { CuentasService } from './cuentas.service';
import {SharedModule} from "../../SharedModule";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe, DecimalPipe} from "@angular/common";

describe('CuentasService', () => {
  let service: CuentasService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [ CuentasService ],
      providers: [
        { provide: MatDialog,  DatePipe, DecimalPipe }
      ]
    })
      .compileComponents();
  });
});
