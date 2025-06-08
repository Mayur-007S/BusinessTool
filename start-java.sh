#!/bin/bash

echo "Starting Java Spring application..."

# Set JAVA_HOME if needed
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# Compile only if target directory doesn't exist or is empty
if [ ! -d "target/classes" ] || [ -z "$(ls -A target/classes 2>/dev/null)" ]; then
    echo "Compiling Java sources..."
    mvn compile -q -DskipTests
fi

# Start the Java application
echo "Starting Spring application on port 8080..."
mvn exec:java -Dexec.mainClass="com.businessdashboard.Application" -q