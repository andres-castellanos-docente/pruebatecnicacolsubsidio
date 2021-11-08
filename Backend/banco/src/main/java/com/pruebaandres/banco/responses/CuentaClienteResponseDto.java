package com.pruebaandres.banco.responses;

import com.pruebaandres.banco.entities.CuentaEntity;
import com.pruebaandres.banco.entities.MovimientoEntity;
import io.swagger.v3.oas.annotations.Hidden;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Hidden
public class CuentaClienteResponseDto extends CuentaResponseDto{
    private ClienteResponseDto clienteByIdCliente;

    public CuentaClienteResponseDto(CuentaEntity cuentaEntity) {
        setId(cuentaEntity.getId());
        setNumero(cuentaEntity.getNumero());
        setSaldo(cuentaEntity.getSaldo());
        setClienteByIdCliente(new ClienteResponseDto(cuentaEntity.getClienteByIdCliente()));
        List<MovimientoResponseDto> movimientosDto = new ArrayList<>();

        if (Objects.isNull(cuentaEntity.getMovimientosByCuenta()) == false) {
            for (MovimientoEntity mov : cuentaEntity.getMovimientosByCuenta()) {
                movimientosDto.add(new MovimientoResponseDto(mov));
            }
            setMovimientosByCuenta(movimientosDto);
        }
    }

    public CuentaClienteResponseDto() {
    }



    public ClienteResponseDto getClienteByIdCliente() {
        return clienteByIdCliente;
    }

    public void setClienteByIdCliente(ClienteResponseDto clienteByIdCliente) {
        this.clienteByIdCliente = clienteByIdCliente;
    }

}
