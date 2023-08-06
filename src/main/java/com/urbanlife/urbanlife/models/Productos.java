package com.urbanlife.urbanlife.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
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

    private int idProducto;
    private String nombre;
    private double precio;
    private String detalle;
    private String color;

    @OneToMany(mappedBy = "productos", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Imagenes> Imagenes;
}
