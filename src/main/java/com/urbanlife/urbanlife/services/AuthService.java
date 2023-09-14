package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.models.request.LoginRequest;
import com.urbanlife.urbanlife.models.request.RegisterAdminRequest;
import com.urbanlife.urbanlife.models.request.RegisterRequest;
import com.urbanlife.urbanlife.models.response.AuthResponse;
import com.urbanlife.urbanlife.models.usuario.RolUser;
import com.urbanlife.urbanlife.models.usuario.Usuario;
import com.urbanlife.urbanlife.repository.UsuarioRepository;
import com.urbanlife.urbanlife.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    UsuarioRepository userRepository;
    @Autowired
    JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getCorreo()).orElseThrow();
        String token =  jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }
    public AuthResponse register(RegisterRequest request) {
        Usuario user = Usuario.builder()
                .username(request.getCorreo())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .telefono(request.getTelefono())
                .role(RolUser.CLIENTE)
                .build();
        userRepository.save(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
    public AuthResponse registerAdmin(RegisterAdminRequest request) {
        Usuario user = Usuario.builder()
                .username(request.getCorreo())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .telefono(request.getTelefono())
                .role(request.getRole())
                .build();
        userRepository.save(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
}