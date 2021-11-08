package com.pruebaandres.banco.services;

import com.pruebaandres.banco.requests.CuentaRequestEdit;
import com.pruebaandres.banco.responses.*;
import org.springframework.http.ResponseEntity;

public interface CuentaService {
    ResponseEntity<CuentaResponse> crearEdCuenta(CuentaRequestEdit client);
    ResponseEntity<CuentaClienteListResponse> leerCuentasCliente(Long idclient);
    ResponseEntity<DeleteResponse> elimCuenta(Long idcuenta);
}
