package com.pruebaandres.banco.requests;

import java.util.Date;

public class ReporteRequest {

    private Long id_cliente;
    private Date fechadesde;
    private Date fechahasta;

    public ReporteRequest() {

    }

    public Date getFechadesde() {
        return fechadesde;
    }

    public void setFechadesde(Date fechadesde) {
        this.fechadesde = fechadesde;
    }

    public Date getFechahasta() {
        return fechahasta;
    }

    public void setFechahasta(Date fechahasta) {
        this.fechahasta = fechahasta;
    }

    public Long getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(Long id_cliente) {
        this.id_cliente = id_cliente;
    }
}
