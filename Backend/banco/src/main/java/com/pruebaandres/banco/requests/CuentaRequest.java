package com.pruebaandres.banco.requests;

public class CuentaRequest {
    private Long numero;
    private Long idCliente;

    public Long getNumero() {
        return numero;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }


    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public CuentaRequest() {

    }


}
