package com.urbanlife.urbanlife.controllers;

import com.urbanlife.urbanlife.models.Dto.ProductoDto;
import com.urbanlife.urbanlife.models.Dto.ProductosAletoriosDTO;
import com.urbanlife.urbanlife.models.ProductosDto;
import com.urbanlife.urbanlife.models.request.ProductoMedidasRequest;
import com.urbanlife.urbanlife.models.request.ProductoRequest;
import com.urbanlife.urbanlife.services.impl.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

@RestController
@RequestMapping("/productos")
@CrossOrigin
public class ProductoController {
    @Autowired
    IProductoService productoService;

    @PostMapping("/registrar")
    public ResponseEntity<?> RegistrarProductoCompleto(@RequestBody ProductoRequest request){
        productoService.registrarProducto(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Producto Creado");
    }
    @PostMapping(
            value = "{idProducto}/producto-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void uploadProductImage(
            @PathVariable("idProducto") Integer idProducto,
            @RequestParam("file") MultipartFile file) {
        productoService.uploadProductImagen(idProducto, file);
    }

    @GetMapping("/listaproductos-all")
    public ResponseEntity<Collection<ProductoDto>> listarProductos() {
        return ResponseEntity.ok(productoService.listaProductosAll());
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
    @GetMapping("/obtener/{id}")
    public ProductoDto obtenerProductoCompletos(@PathVariable Integer id) {
        return productoService.obtenerProducto(id);
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto (@PathVariable Integer id) {
        ResponseEntity<String> response = null;
        productoService.eliminarProducto(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

}
