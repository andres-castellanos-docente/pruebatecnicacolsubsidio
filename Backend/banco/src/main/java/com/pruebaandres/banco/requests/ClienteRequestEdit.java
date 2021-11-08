package com.pruebaandres.banco.requests;

import io.swagger.v3.oas.annotations.Hidden;

@Hidden
public class ClienteRequestEdit extends ClienteRequest {
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ClienteRequestEdit() {

    }
    public ClienteRequestEdit(ClienteRequest cli) {
        setPnombre(cli.getPnombre());
        setPapellido(cli.getPapellido());
        setSapellido(cli.getSapellido());
        setSnombre(cli.getSnombre());
        setTelefono(cli.getTelefono());
        setDireccion(cli.getDireccion());
    }


}
