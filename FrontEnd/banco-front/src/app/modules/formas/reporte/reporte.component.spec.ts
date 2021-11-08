import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteComponent } from './reporte.component';
import {MatDialog} from "@angular/material/dialog";
import {SharedModule} from "../../../SharedModule";
import {DatePipe, DecimalPipe} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ReporteComponent', () => {
  let component: ReporteComponent;
  let fixture: ComponentFixture<ReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [ ReporteComponent ],
      providers: [
        DatePipe, DecimalPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
