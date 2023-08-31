package com.urbanlife.urbanlife.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.net.URL;
import java.util.Set;

@Table
@Entity
@Getter
@Setter
@AllArgsConstructor
public class Categorias {
    @Id
    @SequenceGenerator(name="categorias_sequence", sequenceName = "categorias_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categorias_sequence")

    private int idCategoria;
    private String titulo;
    private String descripcion;
    private String URLIMAGEN;

    @OneToMany(mappedBy = "categorias", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Productos> Productos;

    public Categorias() {
        URLIMAGEN = "";
    }
}
