package com.pruebaandres.banco.responses;

import java.math.BigDecimal;
import java.util.List;

public class MovimientoResponse extends ResponseGeneralArr {

    MovimientoResponseDto movimientos;
    BigDecimal nuevoSaldo;

    public MovimientoResponse(Integer responseCode, List<String> responseDescription, MovimientoResponseDto movimientos, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setMovimientos(movimientos);
    }

    public MovimientoResponse(Integer responseCode, List<String> responseDescription, MovimientoResponseDto movimientos,BigDecimal nuevoSaldo, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setMovimientos(movimientos);
        setNuevoSaldo(nuevoSaldo);
    }

    public MovimientoResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }
    public MovimientoResponse() {

    }
    public MovimientoResponseDto getMovimientos() {
        return movimientos;
    }

    public void setMovimientos(MovimientoResponseDto movimientos) {
        this.movimientos = movimientos;
    }

    public BigDecimal getNuevoSaldo() {
        return nuevoSaldo;
    }

    public void setNuevoSaldo(BigDecimal nuevoSaldo) {
        this.nuevoSaldo = nuevoSaldo;
    }
}
