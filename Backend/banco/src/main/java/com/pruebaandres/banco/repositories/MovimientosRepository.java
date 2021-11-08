package com.pruebaandres.banco.repositories;

import com.pruebaandres.banco.entities.ClienteEntity;
import com.pruebaandres.banco.entities.MovimientoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface MovimientosRepository extends JpaRepository<MovimientoEntity, Long> {
    @Query(
            value = " SELECT  m FROM MovimientoEntity  m JOIN CuentaEntity c ON m.cuentaByIdCuenta= c JOIN ClienteEntity  i " +
                    "ON c.clienteByIdCliente= ?1 WHERE   m.fecha >= ?2 AND m.fecha <= ?3 GROUP BY m")
    List<MovimientoEntity> findByMovimientos(ClienteEntity clie, Date fecdesde, Date fechasta);
}
