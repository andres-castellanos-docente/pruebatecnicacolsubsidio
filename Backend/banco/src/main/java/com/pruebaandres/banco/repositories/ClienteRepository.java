package com.pruebaandres.banco.repositories;

import com.pruebaandres.banco.entities.ClienteEntity;
import com.pruebaandres.banco.querydtos.ClienteQueryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, Long> {
    @Query(value = "SELECT c.id , c.pnombre ||' '|| c.papellido as pnombre,c.snombre, c.sapellido FROM clientes c", nativeQuery = true)
    List<ClienteQueryDto> findAllClients();
}
