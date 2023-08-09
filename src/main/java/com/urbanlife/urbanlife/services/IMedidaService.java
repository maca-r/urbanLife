package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.models.Medidas;

import java.util.Collection;
import java.util.List;

public interface IMedidaService {
    void createMedida(Medidas medidas);
    List<Medidas> getAllMedidas();
}
