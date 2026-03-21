# ===== BUILD STAGE =====
FROM maven:3-eclipse-temurin-17 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source và build
COPY . .
RUN mvn clean package -DskipTests


# ===== RUN STAGE =====
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.war app.war

EXPOSE 8080

CMD ["java", "-jar", "app.war"]
