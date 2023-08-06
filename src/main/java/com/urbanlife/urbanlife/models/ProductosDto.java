package com.urbanlife.urbanlife.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class ProductosDto {
    private int idProducto;
    private String nombre;
    private double precio;
    private String detalle;
    private String color;
}
