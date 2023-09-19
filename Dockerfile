# Etiqueta y versión para la imagen
FROM eclipse-temurin:17-jre


WORKDIR /app
COPY pom.xml .

# Descargar dependencias en la etapa de construcción principal
RUN mvn dependency:go-offline

COPY src ./src
# Compilar la aplicación y empaquetar en un JAR sin ejecutar pruebas
RUN mvn package -DskipTests

# Etiqueta y versión para la imagen final
FROM adoptopenjdk:17-jre-hotspot

WORKDIR /app

# Copiar el archivo JAR compilado desde la etapa de construcción anterior
COPY --from=build /app/target/urbanlife-0.0.1-SNAPSHOT.jar ./app.jar

# Exponer el puerto en el que la aplicación escucha
EXPOSE 8080

# Comando para ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
