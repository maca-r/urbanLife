package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Medidas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedidaRepository extends JpaRepository<Medidas, Integer> {

}
