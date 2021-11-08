package com.pruebaandres.banco.responses;

import java.util.List;

public class ClienteListResponse extends ResponseGeneralArr {

    List<ClienteCuentasResponseDto> clientes;

    public ClienteListResponse(Integer responseCode, List<String> responseDescription, List<ClienteCuentasResponseDto> cliente, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setClientes(cliente);
    }

    public ClienteListResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }
    public ClienteListResponse() {
    }


    public ClienteListResponse(ClienteListResponse dat) {
        setResponseCode(dat.getResponseCode());
        setResponseDescription(dat.getResponseDescription());
        setStatus(dat.getStatus());
        setClientes(dat.getClientes());
    }


    public List<ClienteCuentasResponseDto> getClientes() {
        return clientes;
    }

    public void setClientes(List<ClienteCuentasResponseDto> clientes) {
        this.clientes = clientes;
    }
}
