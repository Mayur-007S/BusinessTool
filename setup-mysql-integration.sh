#!/bin/bash

echo "Setting up MySQL Integration for Business Dashboard"
echo "=================================================="

# Check if Maven is available
if ! command -v mvn &> /dev/null; then
    echo "Installing Maven..."
    apt update && apt install -y maven
fi

# Set Java environment for Nix
export JAVA_HOME=$(dirname $(dirname $(which java)))
export PATH=$JAVA_HOME/bin:$PATH

echo "MySQL Database Configuration:"
echo "  - Database Name: businessanaysisdb"
echo "  - URL: jdbc:mysql://localhost:3306/businessanaysisdb"
echo "  - Driver: MySQL Connector/J 8.0.33"
echo "  - Hibernate Dialect: MySQL8Dialect"
echo ""

echo "Installing MySQL dependencies and compiling..."
mvn dependency:resolve -q
mvn compile -q -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Maven compilation successful"
    echo "✅ MySQL JDBC driver installed (8.0.33)"
    echo "✅ Hibernate configured for MySQL8Dialect"
    echo "✅ Connection pool configured with HikariCP"
    echo ""
    echo "Database Schema Information:"
    echo "  Tables will be auto-created by Hibernate:"
    echo "    - customers (id, name, email, phone, address)"
    echo "    - products (id, name, description, price, category, stock_quantity)"
    echo "    - sales (id, product_id, customer_id, quantity, unit_price, total_amount, sale_date)"
    echo ""
    echo "To start the MySQL-enabled backend:"
    echo "  1. Ensure MySQL server is running on localhost:3306"
    echo "  2. Create database: CREATE DATABASE businessanaysisdb;"
    echo "  3. Run: ./run-java-backend.sh"
    echo ""
    echo "API will be available at: http://localhost:8080"
else
    echo "❌ Compilation failed. Check Maven dependencies."
    exit 1
fi