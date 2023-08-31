package com.urbanlife.urbanlife.services.impl;

import com.urbanlife.urbanlife.models.Categorias;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICategoriaService {
    public void crearCategoria(Categorias categoria, MultipartFile file);
    List<Categorias> obtenerListaCategoria();
}
