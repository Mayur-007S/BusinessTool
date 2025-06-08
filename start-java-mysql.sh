#!/bin/bash

echo "Starting Java Spring Backend with MySQL"
echo "======================================"

# Set Java environment
export JAVA_HOME=$(dirname $(dirname $(which java)))
export PATH=$JAVA_HOME/bin:$PATH

echo "Java Home: $JAVA_HOME"
echo "Database: jdbc:mysql://localhost:3306/businessanaysisdb"
echo ""

# Quick compile without tests
echo "Compiling application..."
mvn compile -DskipTests -q &
COMPILE_PID=$!

# Wait for compilation or timeout after 30 seconds
timeout 30 wait $COMPILE_PID
if [ $? -eq 0 ]; then
    echo "Compilation successful"
else
    echo "Compilation taking longer, continuing anyway..."
fi

echo ""
echo "Starting Spring Boot application..."
echo "This will connect to your local MySQL database"
echo "Backend will be available at http://localhost:8080"
echo ""

# Start the application
mvn exec:java -Dexec.mainClass="com.businessdashboard.Application" -Dexec.cleanupDaemonThreads=false