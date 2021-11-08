package com.pruebaandres.banco.responses;

import com.pruebaandres.banco.entities.ClienteEntity;
import io.swagger.v3.oas.annotations.Hidden;

@Hidden
public class ClienteResponseDto {
    private Long id;
    private String pnombre;
    private String snombre;
    private String papellido;
    private String sapellido;
    private String direccion;
    private Long telefono;

    public ClienteResponseDto(ClienteEntity clienteEntity) {
        setId(clienteEntity.getId());
        setTelefono(clienteEntity.getTelefono());
        setPnombre(clienteEntity.getPnombre());
        setPapellido(clienteEntity.getPapellido());
        setSapellido(clienteEntity.getSapellido());
        setSnombre(clienteEntity.getSnombre());
        setDireccion(clienteEntity.getDireccion());
    }
    public ClienteResponseDto() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPnombre() {
        return pnombre;
    }

    public void setPnombre(String pnombre) {
        this.pnombre = pnombre;
    }

    public String getSnombre() {
        return snombre;
    }

    public void setSnombre(String snombre) {
        this.snombre = snombre;
    }

    public String getPapellido() {
        return papellido;
    }

    public void setPapellido(String papellido) {
        this.papellido = papellido;
    }

    public String getSapellido() {
        return sapellido;
    }

    public void setSapellido(String sapellido) {
        this.sapellido = sapellido;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getTelefono() {
        return telefono;
    }

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }

}
