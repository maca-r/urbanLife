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
public class Medidas {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idMedida;
    private String talle;

}
