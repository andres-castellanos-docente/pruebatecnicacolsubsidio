package com.pruebaandres.banco.responses;

import com.pruebaandres.banco.entities.CuentaEntity;
import com.pruebaandres.banco.entities.MovimientoEntity;
import io.swagger.v3.oas.annotations.Hidden;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Hidden
public class CuentaResponseDto {
    private Long id;
    private Long numero;
    private BigDecimal saldo;
    private Collection<MovimientoResponseDto> movimientosByCuenta;

    public CuentaResponseDto(CuentaEntity cuentaEntity) {
        setId(cuentaEntity.getId());
        setNumero(cuentaEntity.getNumero());
        setSaldo(cuentaEntity.getSaldo());
        List<MovimientoResponseDto> movimientosDto = new ArrayList<>();

        for (MovimientoEntity mov : cuentaEntity.getMovimientosByCuenta()) {
            movimientosDto.add(new MovimientoResponseDto(mov));
        }

        setMovimientosByCuenta(movimientosDto);
    }
    public CuentaResponseDto() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumero() {
        return numero;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }


    public Collection<MovimientoResponseDto> getMovimientosByCuenta() {
        return movimientosByCuenta;
    }

    public void setMovimientosByCuenta(Collection<MovimientoResponseDto> movimientosByCuenta) {
        this.movimientosByCuenta = movimientosByCuenta;
    }
}
