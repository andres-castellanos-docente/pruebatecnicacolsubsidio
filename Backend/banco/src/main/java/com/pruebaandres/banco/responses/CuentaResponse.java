package com.pruebaandres.banco.responses;

import java.util.List;

public class CuentaResponse extends ResponseGeneralArr {

    CuentaClienteResponseDto cuenta;

    public CuentaResponse() {

    }
    public CuentaResponse(Integer responseCode, List<String> responseDescription, CuentaClienteResponseDto cuenta, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setCuenta(cuenta);
    }

    public CuentaResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }

    public CuentaClienteResponseDto getcuenta() {
        return cuenta;
    }

    public void setCuenta(CuentaClienteResponseDto cuenta) {
        this.cuenta = cuenta;
    }
}
