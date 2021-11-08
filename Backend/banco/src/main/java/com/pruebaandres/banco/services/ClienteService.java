package com.pruebaandres.banco.services;

import com.pruebaandres.banco.requests.ClienteRequestEdit;
import com.pruebaandres.banco.responses.ClienteListReporteResponse;
import com.pruebaandres.banco.responses.ClienteListResponse;
import com.pruebaandres.banco.responses.ClienteResponse;
import com.pruebaandres.banco.responses.DeleteResponse;
import org.springframework.http.ResponseEntity;

public interface ClienteService {
    ResponseEntity<ClienteResponse> crearEdCliente(ClienteRequestEdit client);
    ResponseEntity<ClienteListResponse> leerClientes();
    ResponseEntity<ClienteListReporteResponse> leerClientesLista();
    ResponseEntity<DeleteResponse> elimClient(Long idclient);
}
