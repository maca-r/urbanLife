package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.models.Categorias;

import java.util.List;

public interface ICategoriaService {
    void crearCategoria(Categorias categoria);
    List<Categorias> obtenerListaCategoria();
}
