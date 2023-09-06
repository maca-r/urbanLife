package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Imagenes;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Transactional
@Repository
public interface ImagenRepository extends JpaRepository<Imagenes, Integer> {

    @Modifying
    @Query (value = "Select * from imagenes as ima\n" +
            "where ima.id_producto = :id", nativeQuery = true)
    List<Imagenes> findByProductosIdProducto(@Param("id") Integer id);
}
