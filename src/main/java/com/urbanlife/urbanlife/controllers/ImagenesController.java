package com.urbanlife.urbanlife.controllers;


import com.urbanlife.urbanlife.models.Imagenes;
import com.urbanlife.urbanlife.services.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/imagenes")
@CrossOrigin
public class ImagenesController {

    @Autowired
    IImagenService imagenService;


    @PostMapping("/guardarImagen")
    public ResponseEntity<?>guardarImagen(@RequestBody Imagenes imagenes) {
        imagenService.createImagen(imagenes);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/listarimagenes")
    public  ResponseEntity<Collection<Imagenes>>getAllImagenes(){
        return ResponseEntity.ok(imagenService.getAllImagenes());
    }

    @GetMapping("/listarimagenes/{id}")
    public ResponseEntity<Imagenes> listarImagenes(@PathVariable Integer id) {
        Optional<Imagenes> imagenOptional = imagenService.listarImagenes(id);

        if (imagenOptional.isPresent()) {
            return ResponseEntity.ok(imagenOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
