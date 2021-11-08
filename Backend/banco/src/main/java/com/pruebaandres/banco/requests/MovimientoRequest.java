package com.pruebaandres.banco.requests;

import java.math.BigDecimal;

public class MovimientoRequest {

    private Long id_cuenta;
    private Boolean debito;
    private BigDecimal valor;

    public MovimientoRequest() {

    }

    public Boolean getDebito() {
        return debito;
    }

    public void setDebito(Boolean debito) {
        this.debito = debito;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Long getId_cuenta() {
        return id_cuenta;
    }

    public void setId_cuenta(Long id_cuenta) {
        this.id_cuenta = id_cuenta;
    }
}
