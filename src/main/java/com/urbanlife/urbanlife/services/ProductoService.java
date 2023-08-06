package com.urbanlife.urbanlife.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductoService implements IProductoService {
    @Autowired
    ProductoRepository productoRepository;
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
            listarProductoDto.add(objectMapper.convertValue(producto, ProductosDto.class));
        }
        logger.info("Proceso Finalizado con Exito!");
        return listarProductoDto;
    }


}
