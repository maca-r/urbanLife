package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Medidas;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedidaRepository extends CrudRepository<Medidas, Integer> {

}
