package com.pruebaandres.banco;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Prueba Andres Castellanos - Banco API", version = "1.0", description = "Colsubsudio Cliente"))
public class BancoApplication {

	public static void main(String[] args) {
		SpringApplication.run(BancoApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				String origin = "*";
				registry.addMapping("/**").allowedHeaders("Authorization", "Accept", "Content-Type", "Referer", "User-Agent").allowedOrigins(origin).allowedMethods("GET", "POST", "OPTIONS", "PUT", "DELETE");
			}
		};
	}
}
