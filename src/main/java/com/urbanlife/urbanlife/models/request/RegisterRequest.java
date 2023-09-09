package com.urbanlife.urbanlife.models.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String correo;
    private String nombre;
    private String apellido;
    private String password;
    private Integer telefono;
}
