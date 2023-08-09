package com.urbanlife.urbanlife.controllers;

import com.urbanlife.urbanlife.models.Medidas;
import com.urbanlife.urbanlife.repository.MedidaRepository;
import com.urbanlife.urbanlife.services.IMedidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/talles")
@CrossOrigin
public class MedidaController {
    @Autowired
    IMedidaService medidaService;
    @Autowired
    MedidaRepository medidaRepository;

    @PostMapping("/registrarTalle")
    public ResponseEntity<?> registrarTalle(@RequestBody Medidas medida) {
        medidaService.createMedida(medida);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/listartalles")
    public ResponseEntity<Collection<Medidas>> listartalles() {
        return ResponseEntity.ok(medidaService.getAllMedidas());
    }
}
