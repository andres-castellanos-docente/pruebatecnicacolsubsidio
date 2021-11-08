package com.pruebaandres.banco.controllers;

import com.pruebaandres.banco.requests.ClienteRequestEdit;
import com.pruebaandres.banco.requests.ClienteRequest;
import com.pruebaandres.banco.responses.ClienteListReporteResponse;
import com.pruebaandres.banco.responses.ClienteListResponse;
import com.pruebaandres.banco.responses.ClienteResponse;
import com.pruebaandres.banco.responses.DeleteResponse;
import com.pruebaandres.banco.services.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/servicios")
public class ClienteController {

    @Autowired
     ClienteService clienteService;

    @Operation(summary = "Crear Cliente", description = "Crea un nuevo cliente")
    @PostMapping("/cliente")
    public ResponseEntity<ClienteResponse> addClient(@RequestBody ClienteRequest client) {
        return clienteService.crearEdCliente(new ClienteRequestEdit(client));
    }
    @Operation(summary = "Editar Cliente", description = "Edita un cliente")
    @PutMapping("/cliente/{idcliente}")
    public ResponseEntity<ClienteResponse> modClient(@PathVariable(value = "idcliente") Long IdClie, @RequestBody ClienteRequest client) {
        ClienteRequestEdit clientEd = new ClienteRequestEdit(client);
        clientEd.setId(IdClie);
        return clienteService.crearEdCliente(clientEd);
    }
    @Operation(summary = "Leer Clientes Reporte", description = "Lee todos los Clientes Reporte")
    @GetMapping("/clienterep")
    public ResponseEntity<ClienteListReporteResponse> getClientesRep() {
        return clienteService.leerClientesLista();
    }

    @Operation(summary = "Leer Clientes ", description = "Lee todos los Clientes")
    @GetMapping("/cliente")
    public ResponseEntity<ClienteListResponse> getClientes() {
        return clienteService.leerClientes();
    }

    @Operation(summary = "Eliminar Cliente", description = "Elimina un cliente")
    @DeleteMapping("/cliente/{idcliente}")
    public ResponseEntity<DeleteResponse> elClient(@PathVariable(value = "idcliente") Long IdClie) {
        return clienteService.elimClient(IdClie);
    }
}

