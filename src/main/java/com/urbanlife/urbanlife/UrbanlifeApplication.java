package com.urbanlife.urbanlife;

import com.urbanlife.urbanlife.models.request.LoginRequest;
import com.urbanlife.urbanlife.models.request.RegisterAdminRequest;
import com.urbanlife.urbanlife.models.request.RegisterRequest;
import com.urbanlife.urbanlife.models.usuario.Usuario;
import com.urbanlife.urbanlife.repository.UsuarioRepository;
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
			AuthService service,
			UsuarioRepository usuarioRepository
	) {
		return args -> {
			if (usuarioRepository.findByUsername("admin@mail.com").isPresent()) {
				System.out.println("Existe este usuario");
				var admin = LoginRequest.builder()
						.correo("admin@mail.com")
						.password("password")
						.build();
				System.out.println("Admin token:" + service.login(admin).getAccessToken());
			} else {
				var admin = RegisterAdminRequest.builder()
						.nombre("Admin")
						.apellido("Admin")
						.correo("admin@mail.com")
						.password("password")
						.telefono(12322313)
						.role(ADMIN)
						.build();
				System.out.println("Admin token: " + service.registerAdmin(admin).getAccessToken());
			}
		};
	}
}
