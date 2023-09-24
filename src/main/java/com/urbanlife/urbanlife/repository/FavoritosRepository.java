package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Favoritos;
import com.urbanlife.urbanlife.models.usuario.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface FavoritosRepository extends JpaRepository<Favoritos, Integer> {
    @Modifying
    @Query(value="Select f.* \n" +
            "From favoritos as f\n" +
            "where id_producto = :idProducto\n" +
            "and id_usuario = :idUsuario", nativeQuery = true)
    Optional<Favoritos> busquedaFavorito(@Param("idProducto") Integer idProducto,
                                         @Param("idUsuario") Integer idUsuario);

}
