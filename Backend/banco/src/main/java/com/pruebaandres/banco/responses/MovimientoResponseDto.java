package com.pruebaandres.banco.responses;

import com.pruebaandres.banco.entities.MovimientoEntity;
import io.swagger.v3.oas.annotations.Hidden;

import java.math.BigDecimal;
import java.util.Date;

@Hidden
public class MovimientoResponseDto {
    private Long id;
    private Boolean debito;
    private BigDecimal valor;
    private Date fecha;

    public MovimientoResponseDto(MovimientoEntity movimientoEntity) {
        setId(movimientoEntity.getId());
        setDebito(movimientoEntity.getDebito());
        setValor(movimientoEntity.getValor());
        setFecha(movimientoEntity.getFecha());
    }
    public MovimientoResponseDto() {
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }


}
