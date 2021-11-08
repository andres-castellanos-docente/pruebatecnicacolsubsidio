package com.pruebaandres.banco.responses;

import java.util.List;

public class ClienteResponse extends ResponseGeneralArr {

    ClienteCuentasResponseDto clientes;

    public ClienteResponse() {

    }
    public ClienteResponse(Integer responseCode, List<String> responseDescription, ClienteCuentasResponseDto cliente, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setClientes(cliente);
    }

    public ClienteResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }

    public ClienteCuentasResponseDto getClientes() {
        return clientes;
    }

    public void setClientes(ClienteCuentasResponseDto clientes) {
        this.clientes = clientes;
    }
}
