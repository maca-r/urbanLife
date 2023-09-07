package com.urbanlife.urbanlife.Security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAutentFilter jwtAutentFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        return http
                .csrf(csrf ->
                        csrf
                                .disable())
                .authorizeHttpRequests(authRequest ->
                                authRequest
                                        .requestMatchers("/" , "/auth/**").permitAll()
                                        .requestMatchers("/admin").hasRole("ADMINISTRADOR")
                                        .requestMatchers("product/:id").hasRole("CLIENTE")
                                        .anyRequest().authenticated()
/*
                        .antMatchers("/home").permitAll() // Acceso público
                .antMatchers("/panelAdmin").hasRole("ADMIN") // Solo administradores
                .antMatchers("/rentaProducto").hasRole("CLIENTE") // Solo clientes
                .anyRequest().authenticated() // Cualquier otra ruta requiere autenticación
*/
                )
                .sessionManagement(sessionManager->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAutentFilter, UsernamePasswordAuthenticationFilter.class)
                .build();


    }

}