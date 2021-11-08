package com.pruebaandres.banco.responses;

import java.util.List;

public class CuentaClienteListResponse extends ResponseGeneralArr {

    List<CuentaClienteResponseDto> cuentas;
    public CuentaClienteListResponse() {

    }

    public CuentaClienteListResponse(Integer responseCode, List<String> responseDescription, List<CuentaClienteResponseDto> cuentas, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setCuentas(cuentas);
    }

    public CuentaClienteListResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }

    public List<CuentaClienteResponseDto> getCuentas() {
        return cuentas;
    }

    public void setCuentas(List<CuentaClienteResponseDto> cuentas) {
        this.cuentas = cuentas;
    }
}
