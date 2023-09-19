package com.urbanlife.urbanlife.controllers;

import com.urbanlife.urbanlife.models.response.UsuarioResponse;
import com.urbanlife.urbanlife.services.UsuarioService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin
@RequestMapping("/auth/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;

    @GetMapping("/obtener/{id}")
    public ResponseEntity<?> obtenerUsurio(@PathVariable Integer id) {
        return ResponseEntity.ok(usuarioService.obtenerUsuario(id));
    }
    @GetMapping("/listausuarios-all")
    public ResponseEntity<Collection<UsuarioResponse>> listausuarios() {
        return ResponseEntity.ok(usuarioService.listaUsuariosRegistrados());
    }

}
