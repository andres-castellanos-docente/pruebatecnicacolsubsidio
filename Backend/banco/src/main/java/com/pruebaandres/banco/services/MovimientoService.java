package com.pruebaandres.banco.services;

import com.pruebaandres.banco.requests.MovimientoRequest;
import com.pruebaandres.banco.responses.MovimientoResponse;
import org.springframework.http.ResponseEntity;

public interface MovimientoService {
    ResponseEntity<MovimientoResponse> registarMovimiento(MovimientoRequest mov);

}
