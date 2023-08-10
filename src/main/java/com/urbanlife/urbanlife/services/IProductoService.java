package com.urbanlife.urbanlife.services;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;

import java.util.Collection;

public interface IProductoService {
    void crearProducto(ProductosDto productosDto);
    Collection<ProductosDto> obtenerListaProductos();
    Collection<Productos> productosAletorios();
    ProductosDto obtenerProducto(Integer id);
    void modificarEstadoDelete(Integer id);

}
