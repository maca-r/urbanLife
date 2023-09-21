package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.exception.ResourceNotFoundException;
import com.urbanlife.urbanlife.models.Reservas;
import com.urbanlife.urbanlife.models.request.ReservaRequest;
import com.urbanlife.urbanlife.models.response.UsuarioResponse;
import com.urbanlife.urbanlife.models.usuario.RolUser;
import com.urbanlife.urbanlife.models.usuario.Usuario;
import com.urbanlife.urbanlife.repository.ProductoRepository;
import com.urbanlife.urbanlife.repository.ReservaRepository;
import com.urbanlife.urbanlife.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    @Autowired
    ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final ReservaRepository reservaRepository;
    private final ProductoRepository productoRepository;

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
        return convertUser(usuarioBBDD.get());
    }

    public Collection<UsuarioResponse> listaUsuariosRegistrados() {
        Iterable<Usuario> listaUsuariosBBDD = userRepository.findAll();
        Set<UsuarioResponse> listaUsuario = new HashSet<UsuarioResponse>();
        for (Usuario user : listaUsuariosBBDD) {
            if (user.getRole().equals(RolUser.CLIENTE)) {
                listaUsuario.add(convertUser(user));
            }
        }
        logger.info("Lista Usuarios: Proceso Finalizado con Exito!");
        return listaUsuario;
    }
    public String  guardarReserva(ReservaRequest request) {
        Set<Reservas> reservaProducto = new HashSet<Reservas>();
        reservaProducto.stream()
                .peek( reservas -> {
                 reservas.setFechaInicioAlquiler(request.getFechaIniciAlquiler());
                 reservas.setFechaFinAlquiler(request.getFechaFinAlquiler());
                 reservas.setEstadoReserva("Activo");
                 reservas.setUsuario(userRepository.findById(request.getIdUsuario()).get());
                 reservas.setProductos(productoRepository.findById(request.getIdProducto()).get());
                })
                .collect(Collectors.toList());
        Reservas result = objectMapper.convertValue(reservaProducto, Reservas.class);
        System.out.println(result.getEstadoReserva());
        reservaRepository.save(result);
        return "Registro exitoso: %s".formatted(result.getIdReservas());
    }

    private UsuarioResponse convertUser(Usuario user) {
        return UsuarioResponse.builder()
                .email(user.getEmail())
                .nombre(user.getNombre())
                .apellido(user.getApellido())
                .telefono(user.getTelefono())
                .urlImagen(user.getProfileImageId())
                .build();
    }

}

















