package com.urbanlife.urbanlife.controllers;

import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.repository.CategoriaRepository;
import com.urbanlife.urbanlife.services.ICategoriaService;
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
    @Autowired
    ICategoriaService categoriaService;
    @Autowired
    CategoriaRepository categoriaRepository;
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
}
