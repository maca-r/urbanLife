package com.urbanlife.urbanlife.models;

import com.urbanlife.urbanlife.models.Dto.MedidaDto;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductosDto {
    private int idProducto;
    private String nombre;
    private double precio;
    private String detalle;
    private String color;
    @JoinColumn(name = "idCategoria")
    private Categorias categorias;
}
