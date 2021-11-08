package com.pruebaandres.banco.controllers;

import com.pruebaandres.banco.requests.CuentaRequest;
import com.pruebaandres.banco.requests.CuentaRequestEdit;
import com.pruebaandres.banco.responses.*;
import com.pruebaandres.banco.services.CuentaService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/servicios")
public class CuentaController {

    @Autowired
    CuentaService cuentaService;

    @Operation(summary = "Crear Cuenta", description = "Crea una nueva cuenta para un Cliente")
    @PostMapping("/cuenta")
    public ResponseEntity<CuentaResponse> addCuenta(@RequestBody CuentaRequest cuenta) {
        return cuentaService.crearEdCuenta(new CuentaRequestEdit(cuenta));
    }
    @Operation(summary = "Editar Cuenta", description = "Edita una cuenta")
    @PutMapping("/cuenta/{idcuenta}")
    public ResponseEntity<CuentaResponse> modCuenta(@PathVariable(value = "idcuenta") Long IdCue, @RequestBody CuentaRequest cuenta) {
        CuentaRequestEdit cuentaEd = new CuentaRequestEdit(cuenta);
        cuentaEd.setId(IdCue);
        return cuentaService.crearEdCuenta(cuentaEd);
    }
    @Operation(summary = "Lee Cuentas de un Cliente", description = "Lee todas las Cuentas de un Cliente")
    @GetMapping("/cuenta/{idcliente}")
    public ResponseEntity<CuentaClienteListResponse> getCuentas(@PathVariable(value = "idcliente") Long IdClie) {
        return cuentaService.leerCuentasCliente(IdClie);
    }

    @Operation(summary = "Elimina Cuenta", description = "Elimina una cuenta")
    @DeleteMapping("/cuenta/{idcuenta}")
    public ResponseEntity<DeleteResponse> elCuenta(@PathVariable(value = "idcuenta") Long IdCue) {
        return cuentaService.elimCuenta(IdCue);
    }
}

