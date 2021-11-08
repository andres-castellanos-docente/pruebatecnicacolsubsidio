import { TestBed } from '@angular/core/testing';

import { ClientesService } from './clientes.service';
import {SharedModule} from "../../SharedModule";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialog} from "@angular/material/dialog";

describe('ClientesService', () => {
  let service: ClientesService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [ ClientesService ],
      providers: [
        { provide: MatDialog }
      ]
    })
      .compileComponents();
  });
});
