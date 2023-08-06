package com.urbanlife.urbanlife.controllers;

import com.urbanlife.urbanlife.models.Medidas;
import com.urbanlife.urbanlife.services.IMedidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/talles")
@CrossOrigin
public class MedidaController {
    @Autowired
    IMedidaService medidaService;
    @PostMapping("/registrarTalle")
    public ResponseEntity<?> registrarTalle(@RequestBody Medidas medida) {
        medidaService.createMedida(medida);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/listarTalles")
    public ResponseEntity<Collection<Medidas>> listarTalles() {
        return ResponseEntity.ok(medidaService.getAllMedidas());
    }
}
