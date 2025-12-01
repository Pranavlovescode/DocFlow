# ---- Stage 1: Build ----
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy only the files needed to download dependencies first
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN mvn -B dependency:go-offline

# Now copy the source and build
COPY src ./src
RUN mvn -B clean package -DskipTests

# ---- Stage 2: Runtime ----
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy built jar from first stage
COPY --from=build /app/target/*.jar app.jar

# Render provides PORT automatically
ENV JAVA_OPTS=""
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]






# #using the base image
# FROM eclipse-temurin:21-jdk

# #creating the working director
# WORKDIR /app

# #copying the build to working directory /app
# COPY target/docflow-0.0.1-SNAPSHOT.jar /app/docflow-0.0.1-SNAPSHOT.jar

# #exposing the port
# EXPOSE 8080

# #defining entrypoint for the app
# ENTRYPOINT ["java", "-jar", "docflow-0.0.1-SNAPSHOT.jar"]


# ## Using the base image
# #FROM openjdk:21-jdk-slim
# #
# ## Creating the working directory
# #WORKDIR /app
# #
# ## Copying the build to working directory /app
# #COPY target/docflow-0.0.1-SNAPSHOT.jar /app/docflow-0.0.1-SNAPSHOT.jar
# #
# ## Exposing the port
# #EXPOSE 8080
# #
# ## Defining entrypoint for the app
# #ENTRYPOINT ["java", "-jar", "docflow-0.0.1-SNAPSHOT.jar"]
