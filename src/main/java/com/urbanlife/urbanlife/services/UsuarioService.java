package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.exception.ResourceNotFoundException;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.response.ProductoResponse;
import com.urbanlife.urbanlife.models.response.UsuarioResponse;
import com.urbanlife.urbanlife.models.usuario.RolUser;
import com.urbanlife.urbanlife.models.usuario.Usuario;
import com.urbanlife.urbanlife.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    @Autowired
    ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private static final Logger logger = Logger.getLogger(ProductoService.class);
    public boolean existsCustomerById(Integer id) {
        Optional<Usuario> usuarioBBDD = userRepository.findById(id);
        return usuarioBBDD.isPresent();
    }
    private void checkIfProductoExistsOrThrow(Integer id) {
        if (!existsCustomerById(id)) {
            throw new ResourceNotFoundException(
                    "El Cliente con el id [%s] NO EXISTE".formatted(id)
            );
        }
    }
    public UsuarioResponse obtenerUsuario(Integer id) {
        checkIfProductoExistsOrThrow(id);
        Optional<Usuario> usuarioBBDD = userRepository.findById(id);
        return objectMapper.convertValue(usuarioBBDD, UsuarioResponse.class);
    }

    public Collection<UsuarioResponse> listaUsuariosRegistrados() {
        Iterable<Usuario> listaUsuariosBBDD = userRepository.findAll();
        Set<UsuarioResponse> listaUsuario = new HashSet<UsuarioResponse>();
        for (Usuario user : listaUsuariosBBDD) {
            if (user.getRole().equals(RolUser.CLIENTE)) {
                listaUsuario.add(objectMapper.convertValue(user, UsuarioResponse.class));
            }
        }
        logger.info("Lista Usuarios: Proceso Finalizado con Exito!");
        return listaUsuario;
    }

}

















