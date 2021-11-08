package com.pruebaandres.banco.requests;

import io.swagger.v3.oas.annotations.Hidden;

@Hidden
public class CuentaRequestEdit extends CuentaRequest {
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CuentaRequestEdit() {

    }
    public CuentaRequestEdit(CuentaRequest cue) {
        setNumero(cue.getNumero());
        setIdCliente(cue.getIdCliente());
    }
}
