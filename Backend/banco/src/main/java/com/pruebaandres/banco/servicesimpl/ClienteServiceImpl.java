package com.pruebaandres.banco.servicesimpl;

import com.pruebaandres.banco.entities.ClienteEntity;
import com.pruebaandres.banco.querydtos.ClienteQueryDto;
import com.pruebaandres.banco.repositories.ClienteRepository;
import com.pruebaandres.banco.requests.ClienteRequestEdit;
import com.pruebaandres.banco.responses.*;
import com.pruebaandres.banco.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ClienteServiceImpl implements ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public ResponseEntity<ClienteResponse> crearEdCliente(ClienteRequestEdit client) {
        List<String> listMess = new ArrayList<>();
        try {
            ClienteEntity clienteEntity = new ClienteEntity();
            if (Objects.isNull(client.getId()) == false) {
                clienteEntity.setId(client.getId());
            }
            clienteEntity.setPnombre(client.getPnombre());
            clienteEntity.setPapellido(client.getPapellido());
            clienteEntity.setSapellido(client.getSapellido());
            clienteEntity.setSnombre(client.getSnombre());
            clienteEntity.setTelefono(client.getTelefono());
            clienteEntity.setDireccion(client.getDireccion());
            ClienteEntity clienteSaved = clienteRepository.save(clienteEntity);
            ClienteCuentasResponseDto clienteCuentasResponseDto = new ClienteCuentasResponseDto(clienteSaved);
            listMess.add("Se guardó correctamente el Cliente");
            return new ResponseEntity<>(new ClienteResponse(1, listMess, clienteCuentasResponseDto, HttpStatus.OK.value()), HttpStatus.OK);
        } catch (Exception e) {
            listMess.add("Ocurrio un error al guardar el Cliente");
            return new ResponseEntity<>(new ClienteResponse(-1, listMess, HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<ClienteListResponse> leerClientes() {
        List<String> listMess = new ArrayList<>();
        listMess.add("Se leyeron correctamente los Clientes");
        List<ClienteEntity> clientes = clienteRepository.findAll();

        List<ClienteCuentasResponseDto> clientesDto = new ArrayList<>();
        for (ClienteEntity clie : clientes) {
            clientesDto.add(new ClienteCuentasResponseDto(clie));
        }
        return new ResponseEntity<>(new ClienteListResponse(1, listMess, clientesDto, HttpStatus.OK.value()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ClienteListReporteResponse> leerClientesLista() {
        List<String> listMess = new ArrayList<>();
        listMess.add("Se leyeron correctamente los Clientes para Rep");
        List<ClienteQueryDto> clientes = clienteRepository.findAllClients();
        return new ResponseEntity<>(new ClienteListReporteResponse(1, listMess, clientes, HttpStatus.OK.value()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<DeleteResponse> elimClient(Long idclient) {
        List<String> listMess = new ArrayList<>();
        try {
            clienteRepository.deleteById(idclient);
            listMess.add("Se elimina ok");
            return new ResponseEntity<>(new DeleteResponse(1, listMess, HttpStatus.OK.value()), HttpStatus.OK);
        } catch (Exception e) {
            listMess.add("Ocurrio un error al eliminar el Cliente");
            return new ResponseEntity<>(new DeleteResponse(-1, listMess, HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
