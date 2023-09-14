package com.urbanlife.urbanlife;

import com.urbanlife.urbanlife.models.request.RegisterAdminRequest;
import com.urbanlife.urbanlife.models.request.RegisterRequest;
import com.urbanlife.urbanlife.services.AuthService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.urbanlife.urbanlife.models.usuario.RolUser.ADMIN;

@SpringBootApplication
@OpenAPIDefinition
public class UrbanlifeApplication {
	public static void main(String[] args) {
		SpringApplication.run(UrbanlifeApplication.class, args);
	}
	@Bean
	public CommandLineRunner commandLineRunner(
			AuthService service
	) {
		return args -> {
			var admin = RegisterAdminRequest.builder()
					.nombre("Admin")
					.apellido("Admin")
					.correo("admin@mail.com")
					.password("password")
					.role(ADMIN)
					.build();
			System.out.println("Admin token: " + service.registerAdmin(admin).getAccessToken());
		};
	}
}
