package com.pruebaandres.banco;

import com.pruebaandres.banco.controllers.ClienteController;
import com.pruebaandres.banco.controllers.CuentaController;
import com.pruebaandres.banco.controllers.ReporteController;
import com.pruebaandres.banco.requests.ClienteRequest;
import com.pruebaandres.banco.requests.CuentaRequest;
import com.pruebaandres.banco.requests.MovimientoRequest;
import com.pruebaandres.banco.requests.ReporteRequest;
import com.pruebaandres.banco.responses.*;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BancoApplicationTests {
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ClienteController clienteController;

    @Autowired
    private CuentaController cuentaController;

    @Autowired
    private ReporteController reporteController;

    @Test
    public void
    getClientes() {
        try {

            ClienteListResponse response = restTemplate.getForEntity("http://localhost:" + port + "/api/servicios/cliente", ClienteListResponse.class).getBody();
            ClienteListResponse responseCont = clienteController.getClientes().getBody();
            Assert.assertEquals(response.getResponseCode(), responseCont.getResponseCode());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Listar Clientes OK");
            Assert.assertEquals(response.getClientes().size(), responseCont.getClientes().size());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Cantidad Clientes Igual");
        } catch (Exception e) {
        }
    }

    @Test
    public void
    addClient() {
        try {
            ClienteRequest clienteRequest = new ClienteRequest();
            clienteRequest.setPnombre("Andres");
            clienteRequest.setSnombre("John");
            clienteRequest.setPapellido("Castr");
            clienteRequest.setSapellido("Melen");
            clienteRequest.setDireccion("calle 10");
            clienteRequest.setTelefono(Long.parseLong("3105056460"));
            ClienteResponse response = restTemplate.postForEntity("http://localhost:" + port + "/api/servicios/cliente", clienteRequest, ClienteResponse.class).getBody();
            if (response.getStatus().intValue() != Integer.parseInt("200")) {
                System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " ERROR " + " Crear Cliente " + response.getResponseDescription().toString());
            }
            Assert.assertEquals(response.getStatus().intValue(), Integer.parseInt("200"));
            Assert.assertEquals(response.getResponseCode().intValue(), Integer.parseInt("1"));
            Assert.assertEquals(clienteRequest.getPnombre(), response.getClientes().getPnombre());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Crear Cliente OK");
        } catch (Exception e) {
        }
    }

    @Test
    public void
    editClient() {
        try {
            ClienteRequest clienteRequest = new ClienteRequest();
            clienteRequest.setPnombre("Andres");
            clienteRequest.setSnombre("John");
            clienteRequest.setPapellido("Castro");
            clienteRequest.setSapellido("Melen");
            clienteRequest.setDireccion("calle 10");
            clienteRequest.setTelefono(Long.parseLong("3105056460"));
            Long idclie = Long.parseLong("1");
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<ClienteRequest> requestEntity = new HttpEntity<ClienteRequest>(clienteRequest, headers);
            ClienteResponse response = restTemplate.exchange("http://localhost:" + port + "/api/servicios/cliente/" + idclie.toString(), HttpMethod.PUT, requestEntity, ClienteResponse.class).getBody();
            ClienteResponse responseCont = clienteController.modClient(idclie, clienteRequest).getBody();
            if (response.getStatus().intValue() != Integer.parseInt("200")) {
                System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " ERROR " + " Editar Cliente " + response.getResponseDescription().toString());
            }
            Assert.assertEquals(response.getResponseCode(), responseCont.getResponseCode());
            Assert.assertEquals(response.getClientes().getId(), responseCont.getClientes().getId());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Editar Cliente OK");
        } catch (Exception e) {
        }
    }

    @Test
    public void
    elClient() {
        try {
            ClienteRequest clienteRequest = new ClienteRequest();
            Long idclie = Long.parseLong("1");
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<ClienteRequest> requestEntity = new HttpEntity<ClienteRequest>(clienteRequest, headers);
            DeleteResponse response = restTemplate.exchange("http://localhost:" + port + "/api/servicios/cliente/" + idclie.toString(), HttpMethod.DELETE, requestEntity, DeleteResponse.class).getBody();
            if (response.getStatus().intValue() != Integer.parseInt("200")) {
                System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " ERROR " + " Eliminar Cuenta " + response.getResponseDescription().toString());
            }
            Assert.assertEquals(response.getStatus().intValue(), Integer.parseInt("200"));
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Eliminar Cliente OK");
        } catch (Exception e) {
        }
    }

    @Test
    public void
    getCuentas() {
        try {
            Long idclie = Long.parseLong("1");
            CuentaClienteListResponse response = restTemplate.getForEntity("http://localhost:" + port + "/api/servicios/cuenta/" + idclie.toString(), CuentaClienteListResponse.class).getBody();
            CuentaClienteListResponse responseCont = cuentaController.getCuentas(idclie).getBody();
            Assert.assertEquals(response.getResponseCode(), responseCont.getResponseCode());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Listar Cuentas OK");
            Assert.assertEquals(response.getCuentas().size(), responseCont.getCuentas().size());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Cantidad Cuentas Igual");
        } catch (Exception e) {
        }
    }

    @Test
    public void
    addCuenta() {
        try {
            CuentaRequest cuentaRequest = new CuentaRequest();
            cuentaRequest.setNumero(Long.parseLong("1976123123"));
            cuentaRequest.setIdCliente(Long.parseLong("1"));
            CuentaResponse response = restTemplate.postForEntity("http://localhost:" + port + "/api/servicios/cuenta", cuentaRequest, CuentaResponse.class).getBody();
            if (response.getStatus().intValue() != Integer.parseInt("200")) {
                System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " ERROR " + " Crear Cuenta " + response.getResponseDescription().toString());
            }
            Assert.assertEquals(response.getStatus().intValue(), Integer.parseInt("200"));
            Assert.assertEquals(response.getResponseCode().intValue(), Integer.parseInt("1"));
            Assert.assertEquals(cuentaRequest.getNumero(), response.getcuenta().getNumero());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Crear Cuenta OK");
        } catch (Exception e) {
        }
    }

    @Test
    public void
    editCuenta() {
        try {
            CuentaRequest cuentaRequest = new CuentaRequest();
            cuentaRequest.setNumero(Long.parseLong("9999999"));
            cuentaRequest.setIdCliente(Long.parseLong("1"));
            Long idcuenta = Long.parseLong("1");
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<CuentaRequest> requestEntity = new HttpEntity<CuentaRequest>(cuentaRequest, headers);
            CuentaResponse response = restTemplate.exchange("http://localhost:" + port + "/api/servicios/cuenta/" + idcuenta.toString(), HttpMethod.PUT, requestEntity, CuentaResponse.class).getBody();
            CuentaResponse responseCont = cuentaController.modCuenta(idcuenta, cuentaRequest).getBody();
            if (response.getStatus().intValue() != Integer.parseInt("200")) {
                System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " ERROR " + " Editar Cuenta " + response.getResponseDescription().toString());
            }
            Assert.assertEquals(response.getStatus().intValue(), Integer.parseInt("200"));
            Assert.assertEquals(response.getResponseCode(), responseCont.getResponseCode());
            Assert.assertEquals(response.getcuenta().getId(), responseCont.getcuenta().getId());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Editar Cuenta OK");
        } catch (Exception e) {
        }
    }

    @Test
    public void
    elCuenta() {
        try {
            CuentaRequest cuentaRequest = new CuentaRequest();
            Long idcue = Long.parseLong("1");
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<CuentaRequest> requestEntity = new HttpEntity<CuentaRequest>(cuentaRequest, headers);
            DeleteResponse response = restTemplate.exchange("http://localhost:" + port + "/api/servicios/cuenta/" + idcue.toString(), HttpMethod.DELETE, requestEntity, DeleteResponse.class).getBody();

            if (response.getStatus().intValue() != Integer.parseInt("200")) {
                System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " ERROR " + " Eliminar Cuenta " + response.getResponseDescription().toString());
            }
            Assert.assertEquals(response.getStatus().intValue(), Integer.parseInt("200"));
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Eliminar Cuenta OK");
        } catch (Exception e) {
        }
    }

    @Test
    public void
    regMovimiento() {
        MovimientoResponse response = null;
        try {
            MovimientoRequest movimientoRequest = new MovimientoRequest();
            movimientoRequest.setDebito(true);
            movimientoRequest.setValor(new BigDecimal("300000"));
            Long idcuenta = Long.parseLong("1");
            movimientoRequest.setId_cuenta(idcuenta);
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<MovimientoRequest> requestEntity = new HttpEntity<MovimientoRequest>(movimientoRequest, headers);
            response = restTemplate.exchange("http://localhost:" + port + "/api/servicios/movimiento", HttpMethod.POST, requestEntity, MovimientoResponse.class).getBody();
            if (response.getStatus().intValue() != Integer.parseInt("200")) {
                System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " ERROR " + " Registrar Movimiento " + response.getResponseDescription().toString());
            }
            Assert.assertEquals(response.getStatus().intValue(), Integer.parseInt("200"));
            Assert.assertEquals(response.getResponseCode().intValue(), Integer.parseInt("1"));
            Assert.assertEquals(response.getMovimientos().getValor(), movimientoRequest.getValor());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Registrar Movimiento OK");
        } catch (Exception e) {
        }
    }


    @Test
    public void
    getMovimientos() {
        try {
            Long idclie = Long.parseLong("1");
            ReporteRequest req = new ReporteRequest();
            req.setId_cliente(idclie);

            req.setFechadesde(formatter.parse("2021-11-02 21:40:55.244"));
            req.setFechahasta(new Date());
            CuentaListResponse response = restTemplate.postForEntity("http://localhost:" + port + "/api/servicios/reporte", req, CuentaListResponse.class).getBody();
            CuentaListResponse responseCont = reporteController.leerMovimientos(req).getBody();
            Assert.assertEquals(response.getResponseCode(), responseCont.getResponseCode());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Reporte Movimientos OK");
            Assert.assertEquals(response.getCuentas().size(), responseCont.getCuentas().size());
            System.out.println(formatter.format(new Date(System.currentTimeMillis())) + " INFO " + " Cantidad Reporte Movimientos Igual");
        } catch (Exception e) {
        }
    }

}

