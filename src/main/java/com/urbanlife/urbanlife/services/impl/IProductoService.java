package com.urbanlife.urbanlife.services.impl;
import com.urbanlife.urbanlife.models.Dto.ProductoDto;
import com.urbanlife.urbanlife.models.Dto.ProductosAletoriosDTO;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;

import java.util.Collection;

public interface IProductoService {
    void crearProducto(ProductosDto productosDto);
    Collection<ProductosDto> obtenerListaProductos();
    Collection<Productos> productosAletorios();
    public Collection<ProductosAletoriosDTO> listarProductosAletoriosDTO();
    ProductosDto obtenerProducto(Integer id);
    void modificarEstadoDelete(Integer id);

    void editarProducto (Integer id, ProductosDto productosDto);
    ProductoDto obtenerProductos(Integer id);

}
