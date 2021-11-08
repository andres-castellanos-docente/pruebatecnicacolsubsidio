import { TestBed } from '@angular/core/testing';

import { ReporteService } from './reporte.service';
import {SharedModule} from "../../SharedModule";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DatePipe, DecimalPipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";

describe('ReporteService', () => {
  let service: ReporteService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [ ReporteService ],
      providers: [
        { provide: MatDialog,  DatePipe, DecimalPipe }
      ]
    })
      .compileComponents();
  });

});
