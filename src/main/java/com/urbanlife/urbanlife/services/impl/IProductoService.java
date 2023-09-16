package com.urbanlife.urbanlife.services.impl;
import com.urbanlife.urbanlife.models.Dto.ProductoDto;
import com.urbanlife.urbanlife.models.Dto.ProductosAletoriosDTO;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.models.request.ProductoMedidasRequest;
import com.urbanlife.urbanlife.models.request.ProductoRequest;
import com.urbanlife.urbanlife.models.update.ProductoUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

public interface IProductoService {
    void registrarProducto(ProductoRequest request);
    void uploadProductImagen(Integer idProducto, MultipartFile file);
    Collection<ProductoDto> listaProductosAll();
    Collection<ProductosAletoriosDTO> listarProductosAletoriosDTO();
    void eliminarProducto(Integer id);
    void editarProducto (Integer id, ProductosDto productosDto);
    ProductoDto obtenerProducto(Integer id);
}
