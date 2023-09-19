package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.response.UsuarioResponse;
import com.urbanlife.urbanlife.models.usuario.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;
@Transactional
public interface UserRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByEmail(String email);

    @Query(value ="SELECT u.nombre, u.apellido, u.email, u.telefono, u.profile_image_id\n" +
            "FROM usuario u\n" +
            "where u.role = \"CLIENTE\";", nativeQuery = true)
    Collection<UsuarioResponse> listaUsuarios();

}