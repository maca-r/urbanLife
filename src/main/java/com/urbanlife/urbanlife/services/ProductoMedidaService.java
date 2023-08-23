package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.models.ProductoMedida;
import com.urbanlife.urbanlife.services.impl.IProductoMediaService;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class ProductoMedidaService implements IProductoMediaService {
    @Override
    public void crearProducto(ProductoMedida productoMedida) {
        
    }

    @Override
    public Collection<ProductoMedida> obtenerListaProductoMedida() {
        return null;
    }
}
