package com.urbanlife.urbanlife.controllers.Auth;

import com.urbanlife.urbanlife.models.request.LoginRequest;
import com.urbanlife.urbanlife.models.request.RegisterRequest;
import com.urbanlife.urbanlife.models.response.AuthResponse;
import com.urbanlife.urbanlife.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    AuthService authService;
    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest login) {
        return ResponseEntity.ok(authService.login(login));
    }
    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest register) {
        return ResponseEntity.ok(authService.register(register));
    }
}