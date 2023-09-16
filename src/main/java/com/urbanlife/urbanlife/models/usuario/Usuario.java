package com.urbanlife.urbanlife.models.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "usuario",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "customer_username_unique",
                        columnNames = "username"
                ),
                @UniqueConstraint(
                        name = "profile_image_id_unique",
                        columnNames = "profileImageId"
                )
        }
)
//public class Usuario implements UserDetails
public class Usuario  {
    @Id
    @SequenceGenerator(
            name = "usuario_id_seq",
            sequenceName = "usuario_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "usuario_id_seq"
    )
    private Integer idUsuario;
    @Column(
            nullable = false
    )
    private String username;
    @Column(
            nullable = false
    )
    private String nombre;
    @Column(
            nullable = false
    )
    private String apellido;
    @Column(
            nullable = false
    )
    private String password;
    @Column(
            nullable = false
    )
    private Integer telefono;
    @Column(
            unique = true
    )
    private String profileImageId;
    @Enumerated(EnumType.STRING)
    private Rol role;
   /* @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));
    }

    @Override
    public String getPassword() {
        return this.password;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }*/
}
