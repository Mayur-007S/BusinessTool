#!/bin/bash

echo "MySQL Connection Setup for Business Dashboard"
echo "==========================================="

# Get MySQL connection details from user
read -p "MySQL Host (default: localhost): " MYSQL_HOST
MYSQL_HOST=${MYSQL_HOST:-localhost}

read -p "MySQL Port (default: 3306): " MYSQL_PORT
MYSQL_PORT=${MYSQL_PORT:-3306}

read -p "MySQL Username (default: root): " MYSQL_USER
MYSQL_USER=${MYSQL_USER:-root}

read -s -p "MySQL Password (leave empty if no password): " MYSQL_PASSWORD
echo ""

DATABASE_NAME="businessanaysisdb"

# Test connection
echo "Testing connection to MySQL..."
if [ -z "$MYSQL_PASSWORD" ]; then
    mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -e "SELECT 1;" 2>/dev/null
else
    mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;" 2>/dev/null
fi

if [ $? -eq 0 ]; then
    echo "✅ MySQL connection successful"
else
    echo "❌ Connection failed. Please verify your MySQL server is running and credentials are correct."
    exit 1
fi

# Create database if it doesn't exist
echo "Creating database '$DATABASE_NAME' if it doesn't exist..."
if [ -z "$MYSQL_PASSWORD" ]; then
    mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -e "CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"
else
    mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"
fi

# Run database setup script
echo "Setting up database schema..."
if [ -f "setup-mysql-database.sql" ]; then
    if [ -z "$MYSQL_PASSWORD" ]; then
        mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" "$DATABASE_NAME" < setup-mysql-database.sql
    else
        mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$DATABASE_NAME" < setup-mysql-database.sql
    fi
    echo "✅ Database schema initialized"
else
    echo "⚠️  Setup script not found, tables will be created by Hibernate"
fi

# Update Spring configuration
echo "Updating Spring configuration..."
cat > src/main/resources/application.properties << EOF
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://$MYSQL_HOST:$MYSQL_PORT/$DATABASE_NAME
mysql.username=$MYSQL_USER
mysql.password=$MYSQL_PASSWORD
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

echo "✅ Configuration updated"
echo ""
echo "MySQL connection setup complete!"
echo "Database URL: jdbc:mysql://$MYSQL_HOST:$MYSQL_PORT/$DATABASE_NAME"
echo ""
echo "To start the Java backend:"
echo "./run-java-backend.sh"