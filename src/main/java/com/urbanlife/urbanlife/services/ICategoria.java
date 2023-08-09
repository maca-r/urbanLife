package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.models.Medidas;

import java.util.List;

public interface ICategoria {
    void crearCategoria(Medidas medidas);
    List<Medidas> obtenerListaCategoria();
}
