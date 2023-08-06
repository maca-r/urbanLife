package com.urbanlife.urbanlife.services;
import com.urbanlife.urbanlife.models.ProductosDto;

import java.util.Collection;

public interface IProductoService {
    void crearProducto(ProductosDto productosDto);
    Collection<ProductosDto> obtenerListaProductos();
}
