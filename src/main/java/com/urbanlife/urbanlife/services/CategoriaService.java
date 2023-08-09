package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.models.Medidas;
import com.urbanlife.urbanlife.repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CategoriaService implements ICategoria{
    @Autowired
    CategoriaRepository categoriaRepository;
    @Autowired
    ObjectMapper mapper;
    private static final Logger logger = Logger.getLogger(CategoriaService.class);


    @Override
    public void crearCategoria(Medidas medidas) {
        
    }

    @Override
    public List<Medidas> obtenerListaCategoria() {
        return null;
    }
}
