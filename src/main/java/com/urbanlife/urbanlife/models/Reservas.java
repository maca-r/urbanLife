package com.urbanlife.urbanlife.models;

import com.urbanlife.urbanlife.models.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;
@Table
@Entity
@Data
@AllArgsConstructor
public class Reservas {
    @Id
    @SequenceGenerator(name = "reservas_sequence", sequenceName = "reservas_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "reservas")
    private Integer idReservas;
    private LocalDate fechaReserva;
    private LocalDate fechaIniciAlquiler;
    private LocalDate fechaFinAlquiler;
    private String estadoReserva;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idProducto")
    private Productos productos;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    public Reservas() {
        fechaReserva = LocalDate.now();
    }
}
