package com.pruebaandres.banco.servicesimpl;

import com.pruebaandres.banco.entities.ClienteEntity;
import com.pruebaandres.banco.entities.CuentaEntity;
import com.pruebaandres.banco.repositories.ClienteRepository;
import com.pruebaandres.banco.repositories.CuentasRepository;
import com.pruebaandres.banco.requests.CuentaRequestEdit;
import com.pruebaandres.banco.responses.*;
import com.pruebaandres.banco.services.CuentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CuentaServiceImpl implements CuentaService {

    @Autowired
    private CuentasRepository cuentasRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public ResponseEntity<CuentaResponse> crearEdCuenta(CuentaRequestEdit cuenta) {
        List<String> listMess = new ArrayList<>();
        try {
            CuentaEntity cuentaEntity = new CuentaEntity();

            Optional<ClienteEntity> client = clienteRepository.findById(cuenta.getIdCliente());
            if (client.isPresent()) {

                if (Objects.isNull(cuenta.getId()) == false) {
                    cuentaEntity.setId(cuenta.getId());
                    Optional<CuentaEntity> cuentaFind = cuentasRepository.findById(cuenta.getId());
                    cuentaEntity.setSaldo(cuentaFind.get().getSaldo());
                } else {
                    cuentaEntity.setSaldo(new BigDecimal("0"));
                }
                cuentaEntity.setNumero(cuenta.getNumero());
                cuentaEntity.setClienteByIdCliente(client.get());

                CuentaEntity cuentaSaved = cuentasRepository.save(cuentaEntity);
                CuentaClienteResponseDto cuentaClienteResponseDto = new CuentaClienteResponseDto(cuentaSaved);
                listMess.add("Se guardó correctamente la Cuenta");
                return new ResponseEntity<>(new CuentaResponse(1, listMess, cuentaClienteResponseDto, HttpStatus.OK.value()), HttpStatus.OK);
            } else {
                listMess.add("Cliente no existe.");
                return new ResponseEntity<>(new CuentaResponse(1, listMess, null, HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
            }

        } catch (DataIntegrityViolationException se) {
            listMess.add("Ocurrio un error al guardar la Cuenta, Ya existe otra cuenta con el número: " + cuenta.getNumero());
            return new ResponseEntity<>(new CuentaResponse(-1, listMess, HttpStatus.ACCEPTED.value()), HttpStatus.ACCEPTED);
        } catch (Exception se) {
            String cause = se.getCause().getLocalizedMessage();

            listMess.add("Ocurrio un error al guardar la Cuenta");
            return new ResponseEntity<>(new CuentaResponse(-1, listMess, HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<CuentaClienteListResponse> leerCuentasCliente(Long idclient) {
        List<String> listMess = new ArrayList<>();
        Optional<ClienteEntity> client = clienteRepository.findById(idclient);
        List<CuentaClienteResponseDto> cuentasDto = new ArrayList<>();
        if (client.isPresent()) {
            List<CuentaEntity> cuentas = cuentasRepository.findByClienteByIdCliente(client.get());
            for (CuentaEntity cue : cuentas) {
                cuentasDto.add(new CuentaClienteResponseDto(cue));
            }
            listMess.add("Se leyeron correctamente las Cuentas");
            return new ResponseEntity<>(new CuentaClienteListResponse(1, listMess, cuentasDto, HttpStatus.OK.value()), HttpStatus.OK);
        } else {
            listMess.add("Cliente no existe.");
            return new ResponseEntity<>(new CuentaClienteListResponse(1, listMess, cuentasDto, HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<DeleteResponse> elimCuenta(Long idcuenta) {
        List<String> listMess = new ArrayList<>();
        try {
            cuentasRepository.deleteById(idcuenta);
            listMess.add("Se elimina la cuenta ok");
            return new ResponseEntity<>(new DeleteResponse(1, listMess, HttpStatus.OK.value()), HttpStatus.OK);
        } catch (Exception e) {
            listMess.add("Ocurrio un error al eliminar la Cuenta");
            return new ResponseEntity<>(new DeleteResponse(-1, listMess, HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
