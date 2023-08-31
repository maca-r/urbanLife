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
    public void crearCategoria(Categorias categoria) {
        if (categoria != null) {
            guardarCategoria(categoria);
            logger.info("Se registro exitosamente la categoria");
        }else {logger.error("Surgio un problema, no se registro la categoria");}
    }
    private void guardarCategoria(Categorias categoria) {
        categoriaRepository.save(categoria);
    }
    public void uploadCategoryImage(Integer id, MultipartFile file) {
        //checkIfCustomerExistsOrThrow(customerId);
        String profileImageId = UUID.randomUUID().toString();
        try {
             s3Service.uploadFile(
                    s3Buckets.getCustomer(),
                    file.getBytes(),
                    "categoria-images/%s/%s".formatted(id, profileImageId)
            );
        } catch (IOException e) {
            throw new RuntimeException("failed to upload profile image category", e);
        }
    }
    @Override
    public List<Categorias> obtenerListaCategoria() {
        return categoriaRepository.findAll();
    }
}
