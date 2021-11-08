package com.pruebaandres.banco.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.Hidden;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Objects;


@Entity
@Hidden
@Table(name = "cuentas")
public class CuentaEntity {
    private Long id;
    private Long numero;
    private BigDecimal saldo;
    private ClienteEntity clienteByIdCliente;
    private Collection<MovimientoEntity> movimientosByCuenta;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Hidden
    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    @JsonBackReference
    public ClienteEntity getClienteByIdCliente() {
        return clienteByIdCliente;
    }

    public void setClienteByIdCliente(ClienteEntity clienteByIdCliente) {
        this.clienteByIdCliente = clienteByIdCliente;
    }

    @Basic
    @Column(name = "numero", nullable = false, unique=true)
    public Long getNumero() {
        return numero;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }
    @Basic
    @Column(name = "saldo", nullable = false,precision = 18, scale = 4)
    @Type(type = "big_decimal")
    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }


    @Hidden
    @OneToMany(mappedBy = "cuentaByIdCuenta", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    public Collection<MovimientoEntity> getMovimientosByCuenta() {
        return movimientosByCuenta;
    }

    public void setMovimientosByCuenta(Collection<MovimientoEntity> movimientosByCuenta) {
        this.movimientosByCuenta = movimientosByCuenta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CuentaEntity that = (CuentaEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(numero, that.numero) && Objects.equals(saldo, that.saldo)
                && Objects.equals(clienteByIdCliente, that.clienteByIdCliente) && Objects.equals(movimientosByCuenta, that.movimientosByCuenta);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, numero, saldo, clienteByIdCliente, movimientosByCuenta);
    }
}
