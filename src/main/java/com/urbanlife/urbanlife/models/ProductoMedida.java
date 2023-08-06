package com.urbanlife.urbanlife.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Table
@Entity
@Getter
@Setter
@AllArgsConstructor
public class ProductoMedida {
    @Id
    @SequenceGenerator(name = "productoMedida_sequence", sequenceName = "productoMedida_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "productoMedida")
    private int idProductoMedida;
    private int cantidad;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idProducto")
    private Productos productos;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idMedida")
    private Medidas medida;


}
