package com.urbanlife.urbanlife.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Table
@Entity
@Getter
@Setter
@AllArgsConstructor
public class Productos {
    @Id
    @SequenceGenerator(name="productos_sequence", sequenceName = "productos_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "productos_sequence")

    private Integer idProducto;
    private String nombre;
    private double precio;
    private String detalle;
    private String color;
    private String tela;
    private String genero;
    private String evento;
    private String temporada;
    private LocalDateTime fechaActual;
    private Boolean eliminarProducto;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idCategoria")
    private Categorias categorias;

    @OneToMany(mappedBy = "productos", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Imagenes> Imagenes;
    public Productos() {
        fechaActual = LocalDateTime.now();
        eliminarProducto = false;
    }
}