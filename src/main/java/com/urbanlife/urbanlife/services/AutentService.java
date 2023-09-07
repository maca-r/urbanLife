package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.Security.AutentResponse;
import com.urbanlife.urbanlife.Security.LoginRequest;
import com.urbanlife.urbanlife.Security.RegisterRequest;
import com.urbanlife.urbanlife.models.RolUser;
import com.urbanlife.urbanlife.models.Usuario;
import com.urbanlife.urbanlife.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AutentService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AutentResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=usuarioRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return AutentResponse.builder()
                .token(token)
                .build();

    }

    public AutentResponse register(RegisterRequest request) {
        Usuario user = Usuario.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode( request.getPassword()))
                .name(request.getName())
                .role(RolUser.CLIENTE)
                .build();

        usuarioRepository.save(user);

        return AutentResponse.builder()
                .token(jwtService.getToken(user))
                .build();

    }
}