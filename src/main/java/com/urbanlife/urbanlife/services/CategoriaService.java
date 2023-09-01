package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.exception.ResourceNotFoundException;
import com.urbanlife.urbanlife.models.Categorias;
import com.urbanlife.urbanlife.models.Dto.CategoriaDto;
import com.urbanlife.urbanlife.repository.CategoriaRepository;
import com.urbanlife.urbanlife.s3.S3Buckets;
import com.urbanlife.urbanlife.s3.S3Service;
import com.urbanlife.urbanlife.services.impl.ICategoriaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public void crearCategoria(CategoriaDto categoriaDto) {
        if (categoriaDto != null) {
            guardarCategoria(categoriaDto);
            logger.info("Se registro exitosamente la categoria");
        }else {logger.error("Surgio un problema, no se registro la categoria");}
    }
    private void guardarCategoria(CategoriaDto categoriaDto) {
        Categorias newCategorias = mapper.convertValue(categoriaDto, Categorias.class);
        categoriaRepository.save(newCategorias);
    }
    public void uploadCategoryImage(Integer id, MultipartFile file) {
        //checkIfCustomerExistsOrThrow(customerId);
        String profileImageId = UUID.randomUUID().toString();
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        try {
             s3Service.uploadFile(
                    s3Buckets.getCustomer(),
                    file.getBytes(),
                    "categoria-images/%s/%s.%s".formatted(id, profileImageId,extension)
            );

        } catch (IOException e) {
            throw new RuntimeException("failed to upload profile image category", e);
        }
        categoriaRepository.updateUrlImagen(id,"%s.%s".formatted(profileImageId,extension));
    }
    public byte[] getCategoryImagen(Integer idCategoria) {
        var categoria = categoriaRepository.findById(idCategoria)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe la categoria con el [%s]".formatted(idCategoria)
                ));
        if (StringUtils.hasText(categoria.getURLIMAGEN())) {
            throw new ResourceNotFoundException(
                    "Esta categoria [%s] no tiene una imagen asignada".formatted(idCategoria));
        }
        byte[] profileImage = s3Service.getObjectBytes(
                s3Buckets.getCustomer(),
                "categoria-images/%s/%s".formatted(idCategoria, categoria.getURLIMAGEN())
        );
        return profileImage;
    }
    public void eliminarCategoria(Integer idCategoria) {
        //checkIfCustomerExistsOrThrow(customerId);
        categoriaRepository.setEstadoEliminar(idCategoria, true);
    }
    @Override
    public List<Categorias> obtenerListaCategoria() {
        return categoriaRepository.findAll().stream()
                .peek(categorias -> categorias.setURLIMAGEN("http://localhost/categorias/%s/categoria-image"
                        .formatted(categorias.getIdCategoria())))
                .collect(Collectors.toList());
    }
}
