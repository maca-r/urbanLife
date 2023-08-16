package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.models.Medidas;
import com.urbanlife.urbanlife.repository.MedidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MedidaService implements IMedidaService {
    @Autowired
    MedidaRepository medidaRepository;

    @Autowired
    ObjectMapper mapper;
    private static final Logger logger = Logger.getLogger(MedidaService.class);
    @Override
    public void createMedida(Medidas medidas) {
        if (medidas != null) {
            saveMedida(medidas);
            logger.info("Se registro exitosamente el talle");
        }else {logger.error("Surgio un problema, no se registro el talle");}
    }
    public void saveMedida(Medidas medida) {
        medidaRepository.save(medida);
    }

    @Override
    public List<Medidas> getAllMedidas() {
        return medidaRepository.findAll();
    }
}
