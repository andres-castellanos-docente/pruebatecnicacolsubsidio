package com.pruebaandres.banco.responses;

import java.util.List;

public class CuentaListResponse extends ResponseGeneralArr {

    List<CuentaResponseDto> cuentas;
    public CuentaListResponse() {

    }

    public CuentaListResponse(Integer responseCode, List<String> responseDescription, List<CuentaResponseDto> cuentas, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
        setCuentas(cuentas);
    }

    public CuentaListResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }

    public List<CuentaResponseDto> getCuentas() {
        return cuentas;
    }

    public void setCuentas(List<CuentaResponseDto> cuentas) {
        this.cuentas = cuentas;
    }
}
