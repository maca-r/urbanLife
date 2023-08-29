package com.urbanlife.urbanlife.models.Dto;

import com.urbanlife.urbanlife.models.Categorias;
import com.urbanlife.urbanlife.models.Medidas;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class ProductoDto {
    private int idProducto;
    private String nombre;
    private double precio;
    private String detalle;
    private String color;
    private String tela;
    private String genero;
    private String evento;
    private String temporada;
    @JoinColumn(name = "idCategoria")
    private Categorias categorias;
    private List<Medidas> talles;
    private Collection<ImagenDto> imagenes;
}
