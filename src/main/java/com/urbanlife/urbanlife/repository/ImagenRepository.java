package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Imagenes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagenRepository extends JpaRepository<Imagenes, Integer> {

    List<Imagenes> findByIdImagen(Integer idImagen);
}
