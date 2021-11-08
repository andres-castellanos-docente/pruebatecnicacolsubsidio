package com.pruebaandres.banco.responses;

import com.pruebaandres.banco.querydtos.ClienteQueryDto;

import java.util.List;

public class ClienteListReporteResponse extends ResponseGeneralArr {

    List<ClienteQueryDto> clientes;

    public ClienteListReporteResponse(Integer responseCode, List<String> responseDescription, List<ClienteQueryDto> cliente, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setClientes(cliente);
    }

    public ClienteListReporteResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }
    public ClienteListReporteResponse() {
    }


    public ClienteListReporteResponse(ClienteListReporteResponse dat) {
        setResponseCode(dat.getResponseCode());
        setResponseDescription(dat.getResponseDescription());
        setStatus(dat.getStatus());
        setClientes(dat.getClientes());
    }


    public List<ClienteQueryDto> getClientes() {
        return clientes;
    }

    public void setClientes(List<ClienteQueryDto> clientes) {
        this.clientes = clientes;
    }
}
