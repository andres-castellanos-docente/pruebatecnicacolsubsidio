package com.pruebaandres.banco.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.Hidden;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Hidden
@Table(name = "clientes")
public class ClienteEntity {
    private Long id;
    private String pnombre;
    private String snombre;
    private String papellido;
    private String sapellido;
    private String direccion;
    private Long telefono;
    private Collection<CuentaEntity> cuentasByCliente;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "pnombre", nullable = false, length = 80)
    public String getPnombre() {
        return pnombre;
    }

    public void setPnombre(String pnombre) {
        this.pnombre = pnombre;
    }

    @Basic
    @Column(name = "snombre", nullable = true, length = 80)
    public String getSnombre() {
        return snombre;
    }

    public void setSnombre(String snombre) {
        this.snombre = snombre;
    }

    @Basic
    @Column(name = "papellido", nullable = false, length = 80)
    public String getPapellido() {
        return papellido;
    }

    public void setPapellido(String papellido) {
        this.papellido = papellido;
    }

    @Basic
    @Column(name = "sapellido", nullable = true, length = 80)
    public String getSapellido() {
        return sapellido;
    }

    public void setSapellido(String sapellido) {
        this.sapellido = sapellido;
    }


    @Basic
    @Column(name = "direccion", nullable = true)
    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @Basic
    @Column(name = "telefono", nullable = true)
    public Long getTelefono() {
        return telefono;
    }

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }

    @Hidden
    @OneToMany(mappedBy = "clienteByIdCliente", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    public Collection<CuentaEntity> getCuentasByCliente() {
        return cuentasByCliente;
    }

    public void setCuentasByCliente(Collection<CuentaEntity> cuentasByCliente) {
        this.cuentasByCliente = cuentasByCliente;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClienteEntity that = (ClienteEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(pnombre, that.pnombre) && Objects.equals(snombre, that.snombre) && Objects.equals(papellido, that.papellido) && Objects.equals(sapellido, that.sapellido) && Objects.equals(direccion, that.direccion) && Objects.equals(telefono, that.telefono) && Objects.equals(cuentasByCliente, that.cuentasByCliente);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, pnombre, snombre, papellido, sapellido, direccion, telefono, cuentasByCliente);
    }
}
