package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Imagenes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImagenRepository extends JpaRepository<Imagenes, Integer> {

    Optional<Imagenes> findByIdImagen(Integer idImagen);
}
