package com.urbanlife.urbanlife.models.request;

import com.urbanlife.urbanlife.models.usuario.RolUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterAdminRequest {
    private String correo;
    private String nombre;
    private String apellido;
    private String password;
    private RolUser role;
}
