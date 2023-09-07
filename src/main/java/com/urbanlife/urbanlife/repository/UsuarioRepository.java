package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {

    Optional<Usuario> findByUsername (String username);
}
