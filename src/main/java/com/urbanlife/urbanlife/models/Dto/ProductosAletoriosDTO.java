package com.urbanlife.urbanlife.models.Dto;

import com.urbanlife.urbanlife.models.Imagenes;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
public class ProductosAletoriosDTO {
    private int idProducto;
    private String nombre;
    private double precio;
    private Collection<ImagenDto> imagenes;
}
