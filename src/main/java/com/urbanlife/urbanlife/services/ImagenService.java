package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.models.Dto.ImagenDto;
import com.urbanlife.urbanlife.models.Imagenes;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.repository.ImagenRepository;
import com.urbanlife.urbanlife.services.impl.IImagenService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ImagenService implements IImagenService {
    @Autowired
    ImagenRepository imagenRepository;
    @Autowired
    ObjectMapper objectMapper;
    private static final Logger logger = Logger.getLogger(ImagenService.class);
    @Override
    public void createImagen(Imagenes imagenes) {
        if (imagenes != null) {
            guardarImagen(imagenes);
            logger.info("Se guardo la imagen");
        }else {logger.error("Surgio un problema, no se guardo la imagen");}
    }
    private Imagenes guardarImagen(Imagenes imagenes) {
        return imagenRepository.save(imagenes);
    }
    @Override
    public List<Imagenes> getAllImagenes() {
        return imagenRepository.findAll();
    }

    @Override
    public Collection<ImagenDto> listarImagenesPorProducto(Integer id) {
        Iterable<Imagenes>listaImagenes = imagenRepository.findByProductosIdProducto(id);
        Set<ImagenDto> imagenesPorProducto = new HashSet<ImagenDto>();

        for (Imagenes imagen : listaImagenes) {
            imagenesPorProducto.add(objectMapper.convertValue(imagen, ImagenDto.class));
        }
        logger.info("Proceso Finalizado con Exito!");
        return imagenesPorProducto;
    }
}
