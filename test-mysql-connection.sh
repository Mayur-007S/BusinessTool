#!/bin/bash

echo "Testing MySQL Connection for Business Dashboard"
echo "=============================================="

# Function to test MySQL connection
test_mysql_connection() {
    local host=$1
    local port=$2
    local user=$3
    local password=$4
    
    if [ -z "$password" ]; then
        mysql -h "$host" -P "$port" -u "$user" -e "SELECT 1;" 2>/dev/null
    else
        mysql -h "$host" -P "$port" -u "$user" -p"$password" -e "SELECT 1;" 2>/dev/null
    fi
}

# Test connection parameters
HOST="localhost"
PORT="3306"
USER="root"
DATABASE="businessanaysisdb"

echo "Testing connection to MySQL server..."
echo "Host: $HOST"
echo "Port: $PORT"
echo "User: $USER"
echo "Database: $DATABASE"
echo ""

# Test basic connection
echo "1. Testing basic MySQL connection..."
if test_mysql_connection "$HOST" "$PORT" "$USER" ""; then
    echo "✅ MySQL connection successful (no password)"
    PASSWORD=""
else
    echo "❌ Connection failed with no password"
    echo "Please enter your MySQL root password:"
    read -s PASSWORD
    
    if test_mysql_connection "$HOST" "$PORT" "$USER" "$PASSWORD"; then
        echo "✅ MySQL connection successful (with password)"
    else
        echo "❌ MySQL connection failed"
        echo "Please check:"
        echo "  - MySQL server is running on localhost:3306"
        echo "  - Root user credentials are correct"
        echo "  - MySQL service is accessible"
        exit 1
    fi
fi

# Test/Create database
echo ""
echo "2. Checking database '$DATABASE'..."
if [ -z "$PASSWORD" ]; then
    DB_EXISTS=$(mysql -h "$HOST" -P "$PORT" -u "$USER" -e "SHOW DATABASES LIKE '$DATABASE';" 2>/dev/null | grep "$DATABASE")
else
    DB_EXISTS=$(mysql -h "$HOST" -P "$PORT" -u "$USER" -p"$PASSWORD" -e "SHOW DATABASES LIKE '$DATABASE';" 2>/dev/null | grep "$DATABASE")
fi

if [ -n "$DB_EXISTS" ]; then
    echo "✅ Database '$DATABASE' exists"
else
    echo "Creating database '$DATABASE'..."
    if [ -z "$PASSWORD" ]; then
        mysql -h "$HOST" -P "$PORT" -u "$USER" -e "CREATE DATABASE $DATABASE;"
    else
        mysql -h "$HOST" -P "$PORT" -u "$USER" -p"$PASSWORD" -e "CREATE DATABASE $DATABASE;"
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ Database '$DATABASE' created successfully"
    else
        echo "❌ Failed to create database"
        exit 1
    fi
fi

# Initialize schema if needed
echo ""
echo "3. Setting up database schema..."
if [ -f "setup-mysql-database.sql" ]; then
    echo "Running database initialization script..."
    if [ -z "$PASSWORD" ]; then
        mysql -h "$HOST" -P "$PORT" -u "$USER" "$DATABASE" < setup-mysql-database.sql
    else
        mysql -h "$HOST" -P "$PORT" -u "$USER" -p"$PASSWORD" "$DATABASE" < setup-mysql-database.sql
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ Database schema initialized"
    else
        echo "❌ Schema initialization failed"
    fi
else
    echo "⚠️  Database setup script not found"
fi

# Update application properties with connection details
echo ""
echo "4. Updating application configuration..."
cat > src/main/resources/application.properties << EOF
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://$HOST:$PORT/$DATABASE
mysql.username=$USER
mysql.password=$PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate Configuration for MySQL
hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
hibernate.hbm2ddl.auto=update
hibernate.show_sql=true
hibernate.format_sql=true
hibernate.connection.CharSet=utf8mb4
hibernate.connection.characterEncoding=utf8
hibernate.connection.useUnicode=true
hibernate.connection.useSSL=false
hibernate.connection.allowPublicKeyRetrieval=true
hibernate.connection.serverTimezone=UTC

# Connection Pool Configuration
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=2
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000

# Server Configuration
server.port=8080
server.servlet.context-path=/

# Jackson Configuration
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=UTC

# Logging Configuration
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
logging.level.org.springframework=INFO
logging.level.com.businessdashboard=DEBUG
EOF

echo "✅ Application properties updated"

echo ""
echo "MySQL connection test completed!"
echo ""
echo "Next steps:"
echo "1. Run: ./run-java-backend.sh"
echo "2. Java backend will start on port 8080"
echo "3. API endpoints will be available at:"
echo "   - http://localhost:8080/api/customers"
echo "   - http://localhost:8080/api/products"
echo "   - http://localhost:8080/api/sales"
echo "   - http://localhost:8080/api/dashboard/stats"