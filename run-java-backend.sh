#!/bin/bash

echo "Starting Java Spring/Hibernate Backend with MySQL..."

# Check if Java is available
if ! command -v java &> /dev/null; then
    echo "Java not found. Please install Java 21 first."
    exit 1
fi

# Check if Maven is available
if ! command -v mvn &> /dev/null; then
    echo "Maven not found. Please install Maven first."
    exit 1
fi

# Set environment variables for database connection
export JAVA_HOME=${JAVA_HOME:-/usr/lib/jvm/java-21-openjdk}

echo "Database Configuration:"
echo "  - URL: jdbc:mysql://localhost:3306/businessanaysisdb"
echo "  - Driver: MySQL Connector/J 8.0.33"
echo "  - Hibernate Dialect: MySQL8Dialect"
echo ""

echo "Compiling Java application..."
mvn compile -q -DskipTests

if [ $? -eq 0 ]; then
    echo "Compilation successful. Starting Spring application on port 8080..."
    echo "Backend will be available at: http://localhost:8080"
    echo ""
    echo "MySQL Database Integration:"
    echo "  - Database: businessanaysisdb"
    echo "  - Tables: customers, products, sales"
    echo "  - Connection Pool: HikariCP"
    echo ""
    echo "API endpoints:"
    echo "  - GET /api/customers"
    echo "  - GET /api/products" 
    echo "  - GET /api/sales"
    echo "  - GET /api/dashboard/stats"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Start the application
    mvn exec:java -Dexec.mainClass="com.businessdashboard.Application" -q
else
    echo "Compilation failed. Please check the errors above."
    exit 1
fi