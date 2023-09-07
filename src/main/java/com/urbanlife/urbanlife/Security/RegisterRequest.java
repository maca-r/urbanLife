package com.urbanlife.urbanlife.Security;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterRequest {

    String username;
    String name;
    String password;
    String ubicacion;


}