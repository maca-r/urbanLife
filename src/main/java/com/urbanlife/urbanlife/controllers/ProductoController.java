package com.urbanlife.urbanlife.controllers;

import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.services.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/productos")
@CrossOrigin
public class ProductoController {
    @Autowired
    IProductoService productoService;
    @PostMapping("/registrar")
    public ResponseEntity<?> RegistrarTalle(@RequestBody ProductosDto productosDto){
        Collection<ProductosDto> listaProductos = productoService.obtenerListaProductos();
        for (ProductosDto producto : listaProductos) {
            if (productosDto.getNombre().equals(producto.getNombre())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Este Producto ya existe!");
            }
        }
        productoService.crearProducto(productosDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Producto Creado");
    }
    @GetMapping()
    public ResponseEntity<Collection<ProductosDto>> listarProductos() {
        return ResponseEntity.ok(productoService.obtenerListaProductos());
    }
    @GetMapping("/listaAleatoria")
    public ResponseEntity<Collection<Productos>> listaAletoria(){
        return ResponseEntity.ok(productoService.productosAletorios());
    }
    @GetMapping("/{id}")
    public ProductosDto obtenerProducto(@PathVariable Integer id) {
        return productoService.obtenerProducto(id);
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto (@PathVariable Integer id) {
        ResponseEntity<String> response = null;
        productoService.modificarEstadoDelete(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

}
