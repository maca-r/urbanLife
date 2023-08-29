package com.urbanlife.urbanlife.controllers;

import com.urbanlife.urbanlife.models.Dto.ProductoDto;
import com.urbanlife.urbanlife.models.Dto.ProductosAletoriosDTO;
import com.urbanlife.urbanlife.models.Productos;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.services.impl.IProductoService;
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
    @GetMapping("/listaproductos-all")
    public ResponseEntity<Collection<ProductosDto>> listarProductos() {
        return ResponseEntity.ok(productoService.obtenerListaProductos());
    }
    @GetMapping("/listaproductos-aleatorio")
    public ResponseEntity<Collection<ProductosAletoriosDTO>> listaAletoria2(){
        return ResponseEntity.ok(productoService.listarProductosAletoriosDTO());
    }

    /*Editar*/
    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarProducto(
            @PathVariable Integer id,
            @RequestBody ProductosDto productosDto) {
        productoService.editarProducto(id, productosDto);
        return ResponseEntity.ok("Producto actualizado exitosamente");
    }

    /*Eliminar*/

    @GetMapping("/{id}")
    public ProductosDto obtenerProducto(@PathVariable Integer id) {
        return productoService.obtenerProducto(id);
    }
    @GetMapping("/obtener/{id}")
    public ProductoDto obtenerProductoCompletos(@PathVariable Integer id) {
        return productoService.obtenerProductos(id);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto (@PathVariable Integer id) {
        ResponseEntity<String> response = null;
        productoService.eliminarProducto(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

}
