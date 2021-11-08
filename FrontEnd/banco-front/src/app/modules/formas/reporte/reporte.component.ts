import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ReporteModel} from "../../models/reporte.model";
import {subirAnimation} from "../../../animations/listanim.animations";
import {buscarMovimientoResponse} from "../../responses/listResponses";
import {ReporteService} from "../../services/reporte.service";
import {AppCargandoService} from "../../../appBase/cargando/app.cargando.service";
import {DialogMessagesComponent} from "../../../appBase/messagesdialog/diagmessages.component";
import {MatDialog} from "@angular/material/dialog";
import {CuentasModel} from "../../models/cuentas.model";
import jsPDF from "jspdf";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {ClientesRepModel} from "../../models/clientesrep.model";
import {valueSelected} from "../../../validators/validators";

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  animations: [subirAnimation]
})
export class ReporteComponent implements OnInit {
  reporteForm: FormGroup;
  cuentasFind: CuentasModel[] | undefined;
  reporteSubmited: boolean | undefined;
  reporteFinded: boolean | undefined;
  selectedReporte: ReporteModel;
  clientesLista: ClientesRepModel[] = [];
  pdfSrc: string = '';
  PDF: jsPDF = new jsPDF;
  filteredOptions: Observable<ClientesRepModel[]> | undefined;
  public positionPdfViewerRelative: boolean = false;

  constructor(public dialog: MatDialog, private builder: FormBuilder, private reporteService: ReporteService,
              private cargServ: AppCargandoService) {
    this.selectedReporte = new ReporteModel(null, false);
    this.reporteForm = this.builder.group({
      id_cliente: [this.selectedReporte.id_cliente, [Validators.required]],
      nombre_cliente: [null, [Validators.required]],
      fechadesde: [this.selectedReporte.fechadesde, [Validators.required]],
      fechahasta: [this.selectedReporte.fechahasta, [Validators.required]]
    });
  }

  public handlePdfLoaded(): void {
    this.positionPdfViewerRelative = true;
  }

  public crearForm(): void {
    this.reporteForm.controls['nombre_cliente'].setValidators([Validators.required, valueSelected(this.clientesLista)]);
  }

  onSubmitReporte() {
    this.pdfSrc = '';
    this.positionPdfViewerRelative = false;
    this.reporteSubmited = true;
    this.reporteFinded = false;
    if (this.reporteForm!.invalid) {
      return;
    }
    const reporteModelEnv = new ReporteModel(this.reporteForm!.value, true);
    this.pdfSrc = '';
    this.reporteService.buscarCuenta(reporteModelEnv).subscribe({
      next: (v) => {
        const response: buscarMovimientoResponse = v as any;
        this.cargServ.detenCargando();
        response.responseCode === 1 ? (
            this.reporteFinded = true,
              this.cuentasFind = response.cuentas, this.PDF = this.reporteService.generarReporte(this.cuentasFind),
              this.pdfSrc = this.PDF?.output('datauristring')) :
          (this.DialogMsg('Ocurrió un error al Buscar Movimientos del Cliente 😅', 'Error', '320px', '632px'));
      },
      error: (e) => {
        this.DialogMsg('Ocurrió un error al Buscar Movimientos del Cliente😅', 'Error', '320px', '632px'),
          this.cargServ.detenCargando()
      }
    });
  }

  descargarReporte() {
    this.PDF.save('reporte' + new Date().getTime() + '.pdf');
  }

  public DialogMsg(mensage: string, title: string, minwidth: string, maxWidth: string): void {
    this.dialog.open(DialogMessagesComponent, {
      minWidth: minwidth,
      maxWidth: maxWidth,
      data: {message: mensage, title: title}
    });
  }

  ngOnInit(): void {
    this.cargServ.iniciarCargando();
    this.reporteService.listarClientesRep().subscribe({
      next: (v) => {
        const response = v as any;
        this.clientesLista = response.clientes;
        this.crearForm(),
          this.cargarAutocomplete();
        this.cargServ.detenCargando();
      },
      error: (e) => {
        this.DialogMsg('Ocurrió un error al Cargar los Clientes 😅', 'Error', '320px', '632px'),
          this.cargServ.detenCargando()
      }
    });
  }

  private cargarAutocomplete(): void {
    this.filteredOptions = this.reporteForm?.controls['nombre_cliente'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.pnombre)),
      map(name => (name ? this._filter(name) : this.clientesLista.slice())),
    );
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.clientesLista.filter(option => option.pnombre?.toLowerCase().includes(filterValue));
  }

  onShopSelectionChanged(event: any) {
    const selectedName = event.option.value?.pnombre;
    this.reporteForm?.controls['nombre_cliente'].setValue(selectedName);
    const selectedValue = event.option.value?.id;
    this.reporteForm?.controls['id_cliente'].setValue(selectedValue);
  }
}
