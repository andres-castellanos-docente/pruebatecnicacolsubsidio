package com.pruebaandres.banco.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.v3.oas.annotations.Hidden;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;


@Entity
@Hidden
@Table(name = "movimientos")
public class MovimientoEntity {
    private Long id;
    private Boolean debito;
    private BigDecimal valor;
    private Date fecha;
    private CuentaEntity cuentaByIdCuenta;


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
    @JoinColumn(name = "id_cuenta", referencedColumnName = "id")
    @JsonBackReference
    public CuentaEntity getCuentaByIdCuenta() {
        return cuentaByIdCuenta;
    }

    public void setCuentaByIdCuenta(CuentaEntity cuentaByIdCuenta) {
        this.cuentaByIdCuenta = cuentaByIdCuenta;
    }

    @Basic
    @Column(name = "debito", nullable = false)
    public Boolean getDebito() {
        return debito;
    }

    public void setDebito(Boolean debito) {
        this.debito = debito;
    }

    @Basic
    @Column(name = "valor", nullable = false,precision = 18, scale = 4)
    @Type(type = "big_decimal")
    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    @Basic
    @Column(name = "fecha", nullable = false)
    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MovimientoEntity that = (MovimientoEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(debito, that.debito) && Objects.equals(valor, that.valor)
                && Objects.equals(fecha, that.fecha) && Objects.equals(cuentaByIdCuenta, that.cuentaByIdCuenta);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, debito, valor, fecha, cuentaByIdCuenta);
    }
}
