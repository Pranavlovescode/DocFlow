#using the base image
FROM eclipse-temurin:21-jdk

#creating the working director
WORKDIR /app

#copying the build to working directory /app
COPY target/docflow-0.0.1-SNAPSHOT.jar /app/docflow-0.0.1-SNAPSHOT.jar

#exposing the port
EXPOSE 8080

#defining entrypoint for the app
ENTRYPOINT ["java", "-jar", "docflow-0.0.1-SNAPSHOT.jar"]


## Using the base image
#FROM openjdk:21-jdk-slim
#
## Creating the working directory
#WORKDIR /app
#
## Copying the build to working directory /app
#COPY target/docflow-0.0.1-SNAPSHOT.jar /app/docflow-0.0.1-SNAPSHOT.jar
#
## Exposing the port
#EXPOSE 8080
#
## Defining entrypoint for the app
#ENTRYPOINT ["java", "-jar", "docflow-0.0.1-SNAPSHOT.jar"]
