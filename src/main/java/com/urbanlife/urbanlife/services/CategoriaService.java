package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.models.Categorias;
import com.urbanlife.urbanlife.repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoriaService implements ICategoriaService {
    @Autowired
    CategoriaRepository categoriaRepository;
    @Autowired
    ObjectMapper mapper;
    private static final Logger logger = Logger.getLogger(CategoriaService.class);


    @Override
    public void crearCategoria(Categorias categoria) {
        if (categoria != null) {
            guardarCategoria(categoria);
            logger.info("Se registro exitosamente el talle");
        }else {logger.error("Surgio un problema, no se registro el talle");}
    }
    private Categorias guardarCategoria(Categorias categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public List<Categorias> obtenerListaCategoria() {
        return categoriaRepository.findAll();
    }
}
