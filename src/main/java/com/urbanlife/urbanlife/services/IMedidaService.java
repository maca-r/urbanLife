package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.models.Medidas;

import java.util.Collection;

public interface IMedidaService {
    void createMedida(Medidas medidas);
    Collection<Medidas> getAllMedidas();
}
