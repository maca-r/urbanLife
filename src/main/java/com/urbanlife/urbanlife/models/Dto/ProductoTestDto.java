package com.urbanlife.urbanlife.models.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
public class ProductoTestDto {
    private Integer idProducto;
    private LocalDateTime fechaActual;
    private String nombre;
}
