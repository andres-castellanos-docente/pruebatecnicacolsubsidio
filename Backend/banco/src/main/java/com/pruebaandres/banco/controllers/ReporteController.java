package com.pruebaandres.banco.controllers;

import com.pruebaandres.banco.requests.ReporteRequest;
import com.pruebaandres.banco.responses.CuentaListResponse;
import com.pruebaandres.banco.services.ReporteService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/servicios")
public class ReporteController {
    @Autowired
    ReporteService reporteService;

    @Operation(summary = "Reporte Movimientos", description = "Reporte movimientos de un Cliente en Rango de Fechas")
    @PostMapping("/reporte")
    public ResponseEntity<CuentaListResponse> leerMovimientos(@RequestBody ReporteRequest reporte) {
        return reporteService.reporteMovimientos(reporte);
    }
}

