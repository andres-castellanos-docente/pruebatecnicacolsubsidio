import { TestBed } from '@angular/core/testing';

import { MovimientosService } from './movimientos.service';
import {SharedModule} from "../../SharedModule";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DatePipe, DecimalPipe} from "@angular/common";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

describe('MovimientosService', () => {
  let service: MovimientosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [ MovimientosService ],
      providers: [
          DatePipe, DecimalPipe
      ]
    })
      .compileComponents();
  });
});
