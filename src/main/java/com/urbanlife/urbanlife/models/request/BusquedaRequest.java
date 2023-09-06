package com.urbanlife.urbanlife.models.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class BusquedaRequest {
    private String nombre;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}
