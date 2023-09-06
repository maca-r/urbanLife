package com.urbanlife.urbanlife.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
@Table
@Entity
@Getter
@Setter
@AllArgsConstructor
public class Reservas {
    @Id
    @SequenceGenerator(name = "reservas_sequence", sequenceName = "reservas_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "reservas")
    private int idReservas;
    private LocalDate fechaReserva;
    private LocalDate fechaIniciAlquiler;
    private LocalDate fechaFinAlquiler;
    private String estadoReserva;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idProducto")
    private Productos productos;

    /*
    * @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;
    * */
    public Reservas() {
        fechaReserva = LocalDate.now();
    }
}
