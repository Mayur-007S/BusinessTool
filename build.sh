#!/bin/bash

# Build and run the Java Spring application
echo "Building Java Spring application..."

# Install Java if not already present
java -version 2>/dev/null || {
    echo "Java not found. Installing OpenJDK 17..."
    apt-get update && apt-get install -y openjdk-17-jdk
}

# Install Maven if not already present
mvn -version 2>/dev/null || {
    echo "Maven not found. Installing Maven..."
    apt-get update && apt-get install -y maven
}

# Clean and compile the project
echo "Compiling Java application..."
mvn clean compile

# Package the application
echo "Packaging application..."
mvn package -DskipTests

# Run the application
echo "Starting Java Spring application on port 8080..."
mvn exec:java -Dexec.mainClass="com.businessdashboard.Application"