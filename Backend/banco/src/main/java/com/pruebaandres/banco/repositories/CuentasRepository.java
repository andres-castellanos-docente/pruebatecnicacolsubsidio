package com.pruebaandres.banco.repositories;

import com.pruebaandres.banco.entities.ClienteEntity;
import com.pruebaandres.banco.entities.CuentaEntity;
import com.pruebaandres.banco.entities.MovimientoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Repository
public interface CuentasRepository extends JpaRepository<CuentaEntity, Long> {
    List<CuentaEntity> findByClienteByIdCliente(ClienteEntity clie);
    @Query(
            value = "SELECT u FROM CuentaEntity u,MovimientoEntity m WHERE u=m.cuentaByIdCuenta  AND  u.clienteByIdCliente = ?1" +
                    " AND u IN ( SELECT u from MovimientoEntity b WHERE b.cuentaByIdCuenta = u AND b.fecha >= ?2 AND b.fecha <= ?3)")
    List<CuentaEntity> findByClienteBycuentaByIdCuentaAndFechaBetween2(ClienteEntity clie, Date fecdesde, Date fechasta);

    @Query(
            value = "SELECT u FROM CuentaEntity u inner join MovimientoEntity m ON m.cuentaByIdCuenta=u WHERE  u.clienteByIdCliente = ?1" )
    List<CuentaEntity> findByClienteBycuentaByIdCuentaAndFechaBetween3(ClienteEntity clie);
    @Query(
            value = " SELECT  u FROM CuentaEntity  u inner join fetch MovimientoEntity m ON m.cuentaByIdCuenta=u WHERE  u.clienteByIdCliente = ?1 AND m IN ?2 GROUP BY u" )
    List<CuentaEntity> findByClienteBycuentaByIdCuentaAndFechaBetween(ClienteEntity clie, Collection<MovimientoEntity> mov);


    @Query(
            value = "SELECT u FROM CuentaEntity u,MovimientoEntity m WHERE u=m.cuentaByIdCuenta  AND  u.clienteByIdCliente = ?1" +
                    " AND u IN ( SELECT u from MovimientoEntity b WHERE b.cuentaByIdCuenta = u AND b.fecha >= ?2 AND b.fecha <= ?3) GROUP BY u")
    List<CuentaEntity> findByClienteBycuentaByIdCuentaAndFechaBetween23(ClienteEntity clie, Date fecdesde, Date fechasta);



}
