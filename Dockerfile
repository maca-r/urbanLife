# Etapa 1: Descargar dependencias de Maven
FROM maven:3.8.4-openjdk-17 AS build-deps
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

# Etapa 2: Compilar la aplicación y crear una imagen con la aplicación compilada
FROM maven:3.8.4-openjdk-17 AS build-app
WORKDIR /app
COPY --from=build-deps /app /app
COPY src ./src
RUN mvn package -DskipTests

# Etapa 3: Crear una nueva imagen con la aplicación compilada
FROM openjdk:17
WORKDIR /app
COPY --from=build-app /app/target/urbanlife-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

