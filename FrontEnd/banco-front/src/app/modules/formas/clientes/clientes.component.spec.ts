import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ClientesComponent} from "./clientes.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../../SharedModule";
import {ClientesService} from "../../services/clientes.service";

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      providers: [ClientesService,
        { provide: MatDialog },
      ],
      declarations: [ ClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
