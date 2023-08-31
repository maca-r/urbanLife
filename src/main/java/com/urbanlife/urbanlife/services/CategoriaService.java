package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.models.Categorias;
import com.urbanlife.urbanlife.repository.CategoriaRepository;
import com.urbanlife.urbanlife.s3.S3Buckets;
import com.urbanlife.urbanlife.s3.S3Service;
import com.urbanlife.urbanlife.services.impl.ICategoriaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class CategoriaService implements ICategoriaService {
    @Autowired
    CategoriaRepository categoriaRepository;
    @Autowired
    ObjectMapper mapper;
    @Autowired
    S3Service s3Service;
    @Autowired
    S3Buckets s3Buckets;
    private static final Logger logger = Logger.getLogger(CategoriaService.class);

    @Override
    public void crearCategoria(Categorias categoria, MultipartFile file) {
        if (categoria != null) {
            guardarCategoria(categoria).setURLIMAGEN(uploadCategoryImage(file));
            logger.info("Se registro exitosamente el talle");
        }else {logger.error("Surgio un problema, no se registro el talle");}
    }
    private Categorias guardarCategoria(Categorias categoria) {
        return categoriaRepository.save(categoria);
    }
    public String uploadCategoryImage(MultipartFile file) {
        //checkIfCustomerExistsOrThrow(customerId);
        String profileImageId = UUID.randomUUID().toString();
        try {
            return s3Service.uploadFile(file);
        } catch (IOException e) {
            throw new RuntimeException("failed to upload profile image", e);
        }
        //customerDao.updateCustomerProfileImageId(profileImageId, customerId);
    }
    @Override
    public List<Categorias> obtenerListaCategoria() {
        return categoriaRepository.findAll();
    }
}
