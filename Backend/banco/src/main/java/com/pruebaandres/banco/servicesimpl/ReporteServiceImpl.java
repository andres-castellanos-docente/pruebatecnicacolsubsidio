package com.pruebaandres.banco.servicesimpl;

import com.pruebaandres.banco.entities.ClienteEntity;
import com.pruebaandres.banco.entities.CuentaEntity;
import com.pruebaandres.banco.entities.MovimientoEntity;
import com.pruebaandres.banco.repositories.ClienteRepository;
import com.pruebaandres.banco.repositories.CuentasRepository;
import com.pruebaandres.banco.repositories.MovimientosRepository;
import com.pruebaandres.banco.requests.ReporteRequest;
import com.pruebaandres.banco.responses.*;
import com.pruebaandres.banco.services.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class ReporteServiceImpl implements ReporteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private MovimientosRepository movimientosRepository;

    @Autowired
    private CuentasRepository cuentasRepository;

    @Override
    public ResponseEntity<CuentaListResponse> reporteMovimientos(ReporteRequest reporteRequest) {
        List<String> listMess = new ArrayList<>();
        Optional<ClienteEntity> client = clienteRepository.findById(reporteRequest.getId_cliente());
        if (client.isPresent()) {
            var reporteRequest2 = reporteRequest.getFechahasta();
            List<MovimientoEntity> movimientos = movimientosRepository.findByMovimientos(client.get(), reporteRequest.getFechadesde(), reporteRequest.getFechahasta());
            Collection<MovimientoEntity> movs = movimientos;
            List<CuentaEntity> cuentas = cuentasRepository.findByClienteBycuentaByIdCuentaAndFechaBetween(client.get(), movs);
            List<CuentaResponseDto> cuentaResponseDto = new ArrayList<>();
            for (CuentaEntity cue : cuentas) {
                CuentaEntity d = new CuentaEntity();
                d.setId(cue.getId());
                d.setSaldo(cue.getSaldo());
                d.setNumero(cue.getNumero());
                d.setClienteByIdCliente(client.get());
                Predicate<MovimientoEntity> byAge = (Predicate<MovimientoEntity>) person -> person.getCuentaByIdCuenta().getId() == (cue.getId());
                List<MovimientoEntity> result = movs.stream().filter(byAge).collect(Collectors.toList());
                d.setMovimientosByCuenta(result);
                cuentaResponseDto.add(new CuentaResponseDto(d));
            }
            listMess.add("Se leyeron correctamente los Movimientos");
            return new ResponseEntity<>(new CuentaListResponse(1, listMess, cuentaResponseDto, HttpStatus.OK.value()), HttpStatus.OK);
        }
        listMess.add("Cliente no Existe");
        return new ResponseEntity<>(new CuentaListResponse(2, listMess, null, HttpStatus.ACCEPTED.value()), HttpStatus.ACCEPTED);
    }
}
