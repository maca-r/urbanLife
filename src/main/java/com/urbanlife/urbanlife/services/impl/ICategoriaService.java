package com.urbanlife.urbanlife.services.impl;

import com.urbanlife.urbanlife.models.Categorias;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICategoriaService {
    void crearCategoria(Categorias categoria);
    void uploadCategoryImage(Integer id,MultipartFile file);
    List<Categorias> obtenerListaCategoria();
}
