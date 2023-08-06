package com.urbanlife.urbanlife.controllers;

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
        productoService.crearProducto(productosDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @GetMapping("listarProductos")
    public ResponseEntity<Collection<ProductosDto>> listarProductos() {
        return ResponseEntity.ok(productoService.obtenerListaProductos());
    }
}
