package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Categorias;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Transactional
public interface CategoriaRepository extends JpaRepository<Categorias, Integer> {
    @Modifying
    @Query(value = """
            UPDATE categorias
            SET urlimagen = :urlImagen
            WHERE id_categoria = :id""",nativeQuery = true)
    void updateUrlImagen(@Param("id")Integer id, @Param("urlImagen")String urlImagen);
}
