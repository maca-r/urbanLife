package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.models.Dto.MedidaDto;
import com.urbanlife.urbanlife.models.Dto.ProductoDto;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;
import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductoService implements IProductoService {
    @Autowired
    ProductoRepository productoRepository;
    @Autowired
    MedidaService medidaService;
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
    public Collection<ProductosDto> obtenerListaProductos() {
        Iterable<Productos> listarProductos = productoRepository.findAll();

        Set<ProductosDto> listarProductoDto = new HashSet<ProductosDto>();
        for (Productos producto : listarProductos) {
            if (!producto.getEliminarProducto()) {
                listarProductoDto.add(objectMapper.convertValue(producto, ProductosDto.class));
            }
        }
        logger.info("Proceso Finalizado con Exito!");
        return listarProductoDto;
    }
    @Override
    public Collection<Productos> productosAletorios() {
        return productoRepository.listProductosAletorios();
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
        productoDto.setCategorias(result.getCategorias());
        productoDto.setTalles(medidaService.listarTallesProducto(id));

        return productoDto;
    }
    @Override
    public void modificarEstadoDelete(Integer id) {
        productoRepository.setEstadoEliminar(id, true);
    }
}
