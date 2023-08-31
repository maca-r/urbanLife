package com.urbanlife.urbanlife.services.impl;

import com.urbanlife.urbanlife.models.Categorias;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICategoriaService {

    // AGREGAR IMAGEN FILE => MultipartFile
    public void crearCategoria(Categorias categoria);
    List<Categorias> obtenerListaCategoria();
}
