package com.urbanlife.urbanlife.controllers;

import com.urbanlife.urbanlife.models.Categorias;
import com.urbanlife.urbanlife.services.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin
public class CategoriaController {
    @Autowired
    ICategoriaService categoriaService;
    @PostMapping("/registrar")
    public ResponseEntity<String> registrarCategoria (@RequestBody Categorias categoria) {
        categoriaService.crearCategoria(categoria);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Se registro exitosamente");
    }
    @GetMapping("/listarcategorias-all")
    public ResponseEntity<List<Categorias>> listarCategorias() {
        return ResponseEntity.ok(categoriaService.obtenerListaCategoria());
    }

}
