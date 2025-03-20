# Sử dụng Maven để build ứng dụng
FROM maven:3-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline  # Tải trước dependencies để tăng tốc build
COPY . .
RUN mvn clean package -DskipTests

# Sử dụng OpenJDK để chạy ứng dụng
FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/*.war app.war
CMD ["java", "-jar", "app.war"]
