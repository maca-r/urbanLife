package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.models.Dto.ProductoDto;
import com.urbanlife.urbanlife.models.Dto.ProductosAletoriosDTO;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.repository.ProductoRepository;
import com.urbanlife.urbanlife.s3.S3Buckets;
import com.urbanlife.urbanlife.s3.S3Service;
import com.urbanlife.urbanlife.services.impl.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;
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
    @Override
    public void uploadProductImagen(Integer idProducto,
                                           MultipartFile file) {
        //checkIfCustomerExistsOrThrow(idProducto);
        String profileImageId = UUID.randomUUID().toString();
        try {
            s3Service.uploadFile(
                    s3Buckets.getCustomer(),
                    file.getBytes(),
                    "product-images/%s/%s".formatted(idProducto, profileImageId)
            );
        } catch (IOException e) {
            throw new RuntimeException("failed to upload profile image", e);
        }
        productoRepository.resgistrarImagenesConProducto(
                profileImageId,
                "product-images/%s/%s".formatted(idProducto, profileImageId),
                idProducto);
    }
    //public void uploadProductoTalle
    @Override
    public Collection<ProductosDto> obtenerListaProductos() {
        Iterable<Productos> listarProductos = productoRepository.findAll();
        Set<ProductosDto> listarProductoDto = new HashSet<ProductosDto>();
        for (Productos producto : listarProductos) {
            if (!producto.getEliminarProducto()) {
                listarProductoDto.add(objectMapper.convertValue(producto, ProductosDto.class));
            }
        }
        logger.info("Lista Productos: Proceso Finalizado con Exito!");
        return listarProductoDto;
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
    public ProductosDto obtenerProducto(Integer id) {
        Optional<Productos> producto = productoRepository.findById(id);
        return objectMapper.convertValue(producto, ProductosDto.class);
    }
    @Override
    public ProductoDto obtenerProductos(Integer id) {
        Optional<Productos> producto = productoRepository.findById(id);
        ProductosDto result = obtenerProducto(id);
        ProductoDto productoDto = new ProductoDto();
        productoDto.setIdProducto(result.getIdProducto());
        productoDto.setNombre(result.getNombre());
        productoDto.setPrecio(result.getPrecio());
        productoDto.setDetalle(result.getDetalle());
        productoDto.setColor(result.getColor());
        productoDto.setTela(result.getTela());
        productoDto.setGenero(result.getGenero());
        productoDto.setEvento(result.getEvento());
        productoDto.setTemporada(result.getTemporada());
        productoDto.setCategorias(result.getCategorias());
        productoDto.setTalles(medidaService.listarTallesProducto(id));
        productoDto.setImagenes(imagenService.listarImagenesPorProducto(id));

        return productoDto;
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
            existingProducto.setEvento(productosDto.getEvento());
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
}
