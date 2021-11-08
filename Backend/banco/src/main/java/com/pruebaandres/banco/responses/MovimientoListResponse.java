package com.pruebaandres.banco.responses;

import java.util.List;

public class MovimientoListResponse extends ResponseGeneralArr {

    List<MovimientoResponseDto> movimientos;
    public MovimientoListResponse() {

    }

    public MovimientoListResponse(Integer responseCode, List<String> responseDescription, List<MovimientoResponseDto> movimientos, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setMovimientos(movimientos);
    }

    public MovimientoListResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }

    public List<MovimientoResponseDto> getMovimientos() {
        return movimientos;
    }

    public void setMovimientos(List<MovimientoResponseDto> movimientos) {
        this.movimientos = movimientos;
    }
}
