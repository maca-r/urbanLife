package com.urbanlife.urbanlife.services.impl;
import com.urbanlife.urbanlife.models.Dto.ProductoDto;
import com.urbanlife.urbanlife.models.Dto.ProductosAletoriosDTO;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

public interface IProductoService {
    void crearProducto(ProductosDto productosDto);
    void uploadProductImagen(Integer idProducto, MultipartFile file);
    Collection<ProductosDto> obtenerListaProductos();
    Collection<ProductosAletoriosDTO> listarProductosAletoriosDTO();
    void eliminarProducto(Integer id);
    void editarProducto (Integer id, ProductosDto productosDto);
    ProductoDto obtenerProducto(Integer id);
}
