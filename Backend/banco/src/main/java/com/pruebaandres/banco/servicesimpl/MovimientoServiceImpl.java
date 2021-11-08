package com.pruebaandres.banco.servicesimpl;

import com.pruebaandres.banco.entities.CuentaEntity;
import com.pruebaandres.banco.entities.MovimientoEntity;
import com.pruebaandres.banco.repositories.CuentasRepository;
import com.pruebaandres.banco.repositories.MovimientosRepository;
import com.pruebaandres.banco.requests.MovimientoRequest;
import com.pruebaandres.banco.responses.*;
import com.pruebaandres.banco.services.MovimientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class MovimientoServiceImpl implements MovimientoService {
    @Autowired
    private CuentasRepository cuentasRepository;

    @Autowired
    private MovimientosRepository movimientosRepository;

    @Override
    public ResponseEntity<MovimientoResponse> registarMovimiento(MovimientoRequest mov) {
        List<String> listMess = new ArrayList<>();
        try {
            MovimientoEntity movimientoEntity = new MovimientoEntity();
            BigDecimal newsaldo;
            Optional<CuentaEntity> cuenta = cuentasRepository.findById(mov.getId_cuenta());
            if (cuenta.isPresent()) {
                if (!mov.getDebito()) {
                    if (cuenta.get().getSaldo().subtract(mov.getValor()).compareTo(new BigDecimal("0")) == -1) {
                        listMess.add("Movimiento de Egreso no permitido\uD83D\uDE05. Excede el valor del Saldo!.");
                        return new ResponseEntity<>(new MovimientoResponse(2, listMess,  HttpStatus.ACCEPTED.value()), HttpStatus.ACCEPTED);
                    }
                    newsaldo = cuenta.get().getSaldo().subtract(mov.getValor());
                }
                else {
                    newsaldo = cuenta.get().getSaldo().add(mov.getValor());
                }
                movimientoEntity.setCuentaByIdCuenta(cuenta.get());
                movimientoEntity.setDebito(mov.getDebito());
                movimientoEntity.setValor(mov.getValor());
                movimientoEntity.setFecha(new Date());
                MovimientoEntity movimientoSaved = movimientosRepository.save(movimientoEntity);
                cuenta.get().setSaldo(newsaldo);
                CuentaEntity cuentaSaved = cuentasRepository.save(cuenta.get());

                MovimientoResponseDto movimientoResponseDto = new MovimientoResponseDto(movimientoSaved);
                listMess.add("Se registró Corectamente el Movimiento");
                return new ResponseEntity<>(new MovimientoResponse(1, listMess, movimientoResponseDto, newsaldo, HttpStatus.OK.value()), HttpStatus.OK);
            } else {
                listMess.add("Cuenta no existe.");
                return new ResponseEntity<>(new MovimientoResponse(2, listMess,  HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
            }

        } catch (Exception se) {
            String cause = se.getCause().getLocalizedMessage();

            listMess.add("Ocurrio un error al registrar el Movimiento");
            return new ResponseEntity<>(new MovimientoResponse(-1, listMess, HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
