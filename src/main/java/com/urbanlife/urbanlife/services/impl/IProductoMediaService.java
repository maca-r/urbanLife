package com.urbanlife.urbanlife.services.impl;

import com.urbanlife.urbanlife.models.ProductoMedida;
import com.urbanlife.urbanlife.models.ProductosDto;

import java.util.Collection;

public interface IProductoMediaService {
    void crearProducto(ProductoMedida productoMedida);
    Collection<ProductoMedida> obtenerListaProductoMedida();
}
