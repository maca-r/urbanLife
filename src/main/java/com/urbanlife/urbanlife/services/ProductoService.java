package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.exception.ResourceNotFoundException;
import com.urbanlife.urbanlife.models.Categorias;
import com.urbanlife.urbanlife.models.Dto.ProductoDto;
import com.urbanlife.urbanlife.models.Dto.ProductosAletoriosDTO;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.models.request.ProductoMedidasRequest;
import com.urbanlife.urbanlife.models.update.ProductoUpdateRequest;
import com.urbanlife.urbanlife.repository.CategoriaRepository;
import com.urbanlife.urbanlife.repository.ProductoRepository;
import com.urbanlife.urbanlife.s3.S3Buckets;
import com.urbanlife.urbanlife.s3.S3Service;
import com.urbanlife.urbanlife.services.impl.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductoService implements IProductoService {
    @Autowired
    ProductoRepository productoRepository;
    @Autowired
    MedidaService medidaService;
    @Autowired
    ImagenService imagenService;
    @Autowired
    S3Service s3Service;
    @Autowired
    S3Buckets s3Buckets;
    @Autowired
    ObjectMapper objectMapper;
    private static final Logger logger = Logger.getLogger(ProductoService.class);
    public boolean existsCustomerById(Integer id) {
        Optional<Productos> producto = productoRepository.findById(id);
        return producto.isPresent();
    }
    private void checkIfProductoExistsOrThrow(Integer id) {
        if (!existsCustomerById(id)) {
            throw new ResourceNotFoundException(
                    "La categoria con el id [%s] NO EXISTE".formatted(id)
            );
        }
    }
    @Override
    public void crearProducto(ProductosDto productosDto) {
        if (productosDto != null) {
            guardarProducto(productosDto);
            logger.info("Paciente: Se registro exitosamente!");
        }else { logger.error("Surgio un problema");}
    }

    private void guardarProducto(ProductosDto productosDto){
        Productos newProducto = objectMapper.convertValue(productosDto, Productos.class);
        productoRepository.save(newProducto);
    }
    /*
    private void guardarProductoRequest(ProductoUpdateRequest request) {
        Productos productos = objectMapper.convertValue(request, Productos.class);
        System.out.println("BBBBBBBBBBB" + productos.getGenero());
        System.out.println("AAAAAAAAAAAAA" + productos.getCategorias());
        productoRepository.save(productos);
    }
    public Categorias getCategorias(Integer id) {
        Optional<Categorias> found = categoriaRepository.findById(id);
        return objectMapper.convertValue(found.get(), Categorias.class);
    }*/
    @Override
    public void uploadProductImagen(Integer idProduct,
                                           MultipartFile file) {
        checkIfProductoExistsOrThrow(idProduct);
        String profileImageId = UUID.randomUUID().toString();
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        try {
            s3Service.uploadFile(
                    s3Buckets.getCustomer(),
                    file.getBytes(),
                    "producto-images/%s/%s.%s".formatted(idProduct, profileImageId,extension)
            );
        } catch (IOException e) {
            throw new RuntimeException("failed to upload profile image", e);
        }
        productoRepository.resgistrarImagenesConProducto(
                "%s.%s".formatted(profileImageId, extension),
                idProduct);
    }
    @Override
    public Collection<ProductoDto> listaProductosAll() {
        Iterable<Productos> listarProductos = productoRepository.findAll();
        Set<ProductoDto> listarProductoDto = new HashSet<ProductoDto>();
        for (Productos producto : listarProductos) {
            if (!producto.getEliminarProducto()) {
                listarProductoDto.add(objectMapper.convertValue(producto, ProductoDto.class));
            }
        }
        logger.info("Lista Productos: Proceso Finalizado con Exito!");
        return listarProductoDto
                .stream()
                .peek(productoDto -> {
                    productoDto.setTalles(medidaService.listarTallesProducto(productoDto.getIdProducto()));
                    productoDto.setImagenes(imagenService.listarImagenesPorProducto(productoDto.getIdProducto()));
                })
                .collect(Collectors.toList());
    }
    @Override
    public Collection<ProductosAletoriosDTO> listarProductosAletoriosDTO() {
        Iterable<Productos> listaProductos = productoRepository.listProductosAletorios();
        Set<ProductosAletoriosDTO> listaProductosDTO = new HashSet<ProductosAletoriosDTO>();
        for (Productos productos : listaProductos) {
            listaProductosDTO.add(objectMapper.convertValue(productos, ProductosAletoriosDTO.class));
        }
        logger.info("Productos Aleatorios: Proceso Finalizado con Exito!");
        return listaProductosDTO
                .stream()
                .peek(productoDTO -> productoDTO.setImagenes(imagenService.listarImagenesPorProducto(productoDTO.getIdProducto())))
                .collect(Collectors.toList());
    }
    @Override
    public ProductoDto obtenerProducto(Integer id) {
        checkIfProductoExistsOrThrow(id);
        Optional<Productos> producto = productoRepository.findById(id);
        ProductoDto result = objectMapper.convertValue(producto, ProductoDto.class);
        result.setTalles(medidaService.listarTallesProducto(id));
        result.setImagenes(imagenService.listarImagenesPorProducto(id));
        return result;
    }
    @Override
    public void editarProducto(Integer id, ProductosDto productosDto) {
        Optional<Productos> existingProductoOptional = productoRepository.findById(id);

        if (existingProductoOptional.isPresent()) {
            Productos existingProducto = existingProductoOptional.get();

            existingProducto.setNombre(productosDto.getNombre());
            existingProducto.setPrecio(productosDto.getPrecio());
            existingProducto.setDetalle(productosDto.getDetalle());
            existingProducto.setColor(productosDto.getColor());
            existingProducto.setTela(productosDto.getTela());
            existingProducto.setGenero(productosDto.getGenero());
            existingProducto.setCorte(productosDto.getCorte());
            existingProducto.setTemporada(productosDto.getTemporada());
            existingProducto.setCategorias(productosDto.getCategorias());

            productoRepository.save(existingProducto);

            logger.info("Producto: Se actualizó exitosamente!");
        } else {
            logger.error("No se encontró el producto con ID: " + id);
        }
    }
    @Override
    public void eliminarProducto(Integer id) {
        productoRepository.setEstadoEliminar(id, true);
    }
    public void guardarListaMedidas(Collection<ProductoMedidasRequest> request, Integer id) {
        checkIfProductoExistsOrThrow(id);
        request.stream()
                .peek(request1 -> {
                    productoRepository.registrarTalleConProducto(
                            10, request1.getIdMedida(), id);
                })
                .collect(Collectors.toList());
    }
}
