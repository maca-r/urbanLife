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
public class Medidas {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idMedida;
    private String talle;

}
