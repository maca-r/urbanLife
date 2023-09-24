package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.exception.ResourceNotFoundException;
import com.urbanlife.urbanlife.models.Dto.ProductosAletoriosDTO;
import com.urbanlife.urbanlife.models.Favoritos;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.Reservas;
import com.urbanlife.urbanlife.models.request.ReservaRequest;
import com.urbanlife.urbanlife.models.response.UsuarioResponse;
import com.urbanlife.urbanlife.models.usuario.RolUser;
import com.urbanlife.urbanlife.models.usuario.Usuario;
import com.urbanlife.urbanlife.repository.FavoritosRepository;
import com.urbanlife.urbanlife.repository.ProductoRepository;
import com.urbanlife.urbanlife.repository.ReservaRepository;
import com.urbanlife.urbanlife.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UserRepository userRepository;
    private final ReservaRepository reservaRepository;
    private final ProductoRepository productoRepository;
    private final FavoritosRepository favoritosRepository;
    private final ImagenService imagenService;

    @Autowired
    ObjectMapper objectMapper;

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
    public Usuario getUsuariById(Integer id) {
        return userRepository.findById(id).get();
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
    public String guardarReserva(ReservaRequest request) {
        checkIfProductoExistsOrThrow(request.getIdUsuario());
        var reserva = Reservas.builder()
                        .fechaReserva(LocalDate.now())
                .fechaInicioAlquiler(request.getFechaIniciAlquiler())
                .fechaFinAlquiler(request.getFechaFinAlquiler())
                .estadoReserva("Activo")
                .productos(productoRepository.findById(request.getIdProducto()).get())
                .usuario(userRepository.findById(request.getIdUsuario()).get())
                .build();
        reservaRepository.save(reserva);
        return "Registro exitoso:";
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
    public Collection<Reservas> listaDeReservas() {
        return reservaRepository.findAll();
    }

    private void guardarFavorito(Integer idProducto, Integer idUsuario) {
        userRepository.registrarFavoritoUsuario(idUsuario, idProducto);
    }
    private void removeFromFavorito(Integer idProducto, Integer idUsuario) {
        Favoritos favorito = favoritosRepository.busquedaFavorito(idProducto, idUsuario).get();
        favoritosRepository.deleteById(favorito.getIdFavoritos());
    }
    public void removeOrAddFromFavorito(Integer idProducto, Integer idUsuario) {
        checkIfProductoExistsOrThrow(idUsuario);
        Productos productos = productoRepository.findById(idProducto)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
        if (favoritosRepository.busquedaFavorito(idProducto, idUsuario).isEmpty())
            removeFromFavorito(idProducto, idUsuario);
        else
            guardarFavorito(idProducto, idUsuario);
    }
    public Collection<ProductosAletoriosDTO> listaFavoritosFromUser(Integer idUser) {
        checkIfProductoExistsOrThrow(idUser);
        Iterable<Productos> listaProductos = productoRepository.listaFavoritos(idUser);
        Set<ProductosAletoriosDTO> listaProductosDTO = new HashSet<ProductosAletoriosDTO>();
        for (Productos productos : listaProductos) {
            listaProductosDTO.add(objectMapper.convertValue(productos, ProductosAletoriosDTO.class));
        }
        logger.info("Lista Productos Favoritos: Proceso Finalizado con Exito!");
        return listaProductosDTO
                .stream()
                .peek(productoDTO -> productoDTO.setImagenes(imagenService.listarImagenesPorProducto(productoDTO.getIdProducto())))
                .collect(Collectors.toList());
    }

}

















