package com.urbanlife.urbanlife.services.impl;

import com.urbanlife.urbanlife.models.Categorias;
import com.urbanlife.urbanlife.models.Dto.CategoriaDto;
import com.urbanlife.urbanlife.models.update.CategoriaUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICategoriaService {
    void crearCategoria(CategoriaDto categoriaDto);
    void uploadCategoryImage(Integer id,
                             MultipartFile file);
    byte[] getCategoryImagen(Integer idCategoria);
    void eliminarCategoria(Integer idCategoria);
    void actualizarCategorias(Integer id,
                                    CategoriaUpdateRequest categoriaDto);
    List<Categorias> obtenerListaCategoria();
}
