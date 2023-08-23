package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.models.Imagenes;

import java.util.List;
import java.util.Optional;

public interface IImagenService {

    void createImagen(Imagenes imagenes);
    List<Imagenes> getAllImagenes();
    List<Imagenes> listarImagenes(Integer id);
}
