package com.urbanlife.urbanlife.services.impl;

import com.urbanlife.urbanlife.models.Dto.ImagenDto;
import com.urbanlife.urbanlife.models.Imagenes;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface IImagenService {

    void createImagen(Imagenes imagenes);
    List<Imagenes> getAllImagenes();
    Collection<ImagenDto> listarImagenesPorProducto(Integer id);
    Optional<Imagenes> obtenerImagen(Integer id);
}