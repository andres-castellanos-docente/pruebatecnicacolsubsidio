import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogCreatClientesComponent } from './dialog-creat-clientes.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../../../SharedModule";

describe('DialogCreatClientesComponent', () => {
  let component: DialogCreatClientesComponent;
  let fixture: ComponentFixture<DialogCreatClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreatClientesComponent ],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialog }
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
