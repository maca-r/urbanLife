package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Productos;
import org.springframework.data.repository.CrudRepository;

public interface ProductoRepository extends CrudRepository<Productos, Integer> {
}
