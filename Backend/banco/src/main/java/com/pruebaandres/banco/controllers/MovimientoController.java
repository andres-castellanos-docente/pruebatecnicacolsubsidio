package com.pruebaandres.banco.controllers;

import com.pruebaandres.banco.requests.MovimientoRequest;
import com.pruebaandres.banco.responses.MovimientoResponse;
import com.pruebaandres.banco.services.MovimientoService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/servicios")
public class MovimientoController {

    @Autowired
    MovimientoService movimientoService;

    @Operation(summary = "Registrar Movimiento", description = "Registra movimiento en una cuenta para un Cliente")
    @PostMapping("/movimiento")
    public ResponseEntity<MovimientoResponse> regMovimiento(@RequestBody MovimientoRequest movimiento) {
        return movimientoService.registarMovimiento(movimiento);
    }

}

