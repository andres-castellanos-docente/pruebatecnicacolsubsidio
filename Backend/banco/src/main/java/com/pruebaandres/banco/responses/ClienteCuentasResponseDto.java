package com.pruebaandres.banco.responses;

import com.pruebaandres.banco.entities.ClienteEntity;
import com.pruebaandres.banco.entities.CuentaEntity;
import io.swagger.v3.oas.annotations.Hidden;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Hidden
public class ClienteCuentasResponseDto extends ClienteResponseDto {
    private List<CuentaResponseDto> cuentasByCliente;

    public ClienteCuentasResponseDto(ClienteEntity clienteEntity) {
        setId(clienteEntity.getId());
        setTelefono(clienteEntity.getTelefono());
        setPnombre(clienteEntity.getPnombre());
        setPapellido(clienteEntity.getPapellido());
        setSapellido(clienteEntity.getSapellido());
        setSnombre(clienteEntity.getSnombre());
        setDireccion(clienteEntity.getDireccion());
        List<CuentaResponseDto> cuentasDto = new ArrayList<>();
        if (Objects.isNull(clienteEntity.getCuentasByCliente()) == false) {
            for (CuentaEntity cue : clienteEntity.getCuentasByCliente()) {
                cuentasDto.add(new CuentaResponseDto(cue));
            }
        }
        setCuentasByCliente(cuentasDto);
    }

    public ClienteCuentasResponseDto() {
    }

    public List<CuentaResponseDto> getCuentasByCliente() {
        return cuentasByCliente;
    }

    public void setCuentasByCliente(List<CuentaResponseDto> cuentasByCliente) {
        this.cuentasByCliente = cuentasByCliente;
    }
}
