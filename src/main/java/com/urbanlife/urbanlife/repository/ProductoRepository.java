package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ProductoRepository extends CrudRepository<Productos, Integer> {
    @Transactional
    @Modifying
    @Query(value = "SELECT * FROM urbanlife.productos WHERE eliminar_producto <> 1 ORDER BY RAND() LIMIT 10", nativeQuery = true)
    Collection<Productos> listProductosAletorios();
    @Transactional
    @Modifying
    @Query(value = "UPDATE productos SET eliminar_producto = :estado WHERE id_producto = :id", nativeQuery = true)
    void setEstadoEliminar(@Param("id") Integer id, @Param("estado") boolean estado);

}
