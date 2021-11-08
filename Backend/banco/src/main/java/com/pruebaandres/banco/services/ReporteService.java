package com.pruebaandres.banco.services;

import com.pruebaandres.banco.requests.ReporteRequest;
import com.pruebaandres.banco.responses.CuentaListResponse;
import org.springframework.http.ResponseEntity;

public interface ReporteService {
    ResponseEntity<CuentaListResponse> reporteMovimientos(ReporteRequest reporteRequest);

}
