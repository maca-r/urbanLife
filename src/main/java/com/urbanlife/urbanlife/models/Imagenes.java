package com.urbanlife.urbanlife.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Imagenes {
    @Id
    @SequenceGenerator(name="imagen_sequence", sequenceName = "imagen_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="imagen")
    private String idImagen;
    private String urlImagen;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idProducto")
    private Productos productos;

}
