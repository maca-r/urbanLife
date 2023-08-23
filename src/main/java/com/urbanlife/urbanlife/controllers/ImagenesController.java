package com.urbanlife.urbanlife.controllers;


import com.urbanlife.urbanlife.models.Imagenes;
import com.urbanlife.urbanlife.services.impl.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/imagenes")
@CrossOrigin
public class ImagenesController {

    @Autowired
    IImagenService imagenService;


    @PostMapping("/registrar")
    public ResponseEntity<?>guardarImagen(@RequestBody Imagenes imagenes) {
        imagenService.createImagen(imagenes);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/listarimagenes-all")
    public  ResponseEntity<Collection<Imagenes>>getAllImagenes(){
        return ResponseEntity.ok(imagenService.getAllImagenes());
    }

    @GetMapping("/obtener/{idProducto}")
    public ResponseEntity<List<Imagenes>> listarImagenesPorProducto(@PathVariable Integer idProducto) {
        List<Imagenes> imagenesDelProducto = imagenService.listarImagenesPorProducto(idProducto);
        return ResponseEntity.ok(imagenesDelProducto);
    }


}
