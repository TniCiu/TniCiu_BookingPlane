# Sử dụng Maven và JDK 17 để build
FROM maven:3-openjdk-17 AS build

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Sử dụng OpenJDK 17 để chạy ứng dụng
FROM openjdk:17
WORKDIR /app

# Copy file .war đã build từ bước trước
COPY --from=build /app/target/Tniciu-API-0.0.1-SNAPSHOT.war app.war

# Chạy ứng dụng Spring Boot
CMD ["java", "-jar", "app.war"]
