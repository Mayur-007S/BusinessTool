#!/bin/bash

echo "Quick MySQL Setup for Business Dashboard"
echo "======================================"

# Try common MySQL connection patterns
test_connections() {
    # Test 1: Local MySQL with no password
    if mysql -u root -e "SELECT 1;" 2>/dev/null; then
        echo "✅ Connected to MySQL as root (no password)"
        MYSQL_USER="root"
        MYSQL_PASSWORD=""
        return 0
    fi
    
    # Test 2: Local MySQL with common passwords
    for pwd in "password" "root" "mysql" ""; do
        if mysql -u root -p"$pwd" -e "SELECT 1;" 2>/dev/null; then
            echo "✅ Connected to MySQL as root"
            MYSQL_USER="root"
            MYSQL_PASSWORD="$pwd"
            return 0
        fi
    done
    
    # Test 3: MySQL on different ports
    for port in 3307 3308; do
        if mysql -u root -P $port -e "SELECT 1;" 2>/dev/null; then
            echo "✅ Connected to MySQL on port $port"
            MYSQL_USER="root"
            MYSQL_PASSWORD=""
            MYSQL_PORT="$port"
            return 0
        fi
    done
    
    return 1
}

# Set defaults
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="root"
MYSQL_PASSWORD=""
DATABASE_NAME="businessanaysisdb"

echo "Detecting MySQL connection..."
if test_connections; then
    echo "MySQL connection detected successfully"
else
    echo "❌ Could not auto-detect MySQL connection"
    echo ""
    echo "Please ensure MySQL is running and try one of these options:"
    echo "1. Start MySQL service: sudo systemctl start mysql"
    echo "2. Check if MySQL is running on a different port"
    echo "3. Verify your MySQL root password"
    echo ""
    echo "You can also run ./connect-mysql.sh for manual configuration"
    exit 1
fi

# Create database
echo "Creating database '$DATABASE_NAME'..."
if [ -z "$MYSQL_PASSWORD" ]; then
    mysql -h "$MYSQL_HOST" -P "${MYSQL_PORT:-3306}" -u "$MYSQL_USER" -e "CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"
else
    mysql -h "$MYSQL_HOST" -P "${MYSQL_PORT:-3306}" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"
fi

if [ $? -eq 0 ]; then
    echo "✅ Database '$DATABASE_NAME' ready"
else
    echo "❌ Failed to create database"
    exit 1
fi

# Setup sample data
echo "Installing sample data..."
if [ -f "setup-mysql-database.sql" ]; then
    if [ -z "$MYSQL_PASSWORD" ]; then
        mysql -h "$MYSQL_HOST" -P "${MYSQL_PORT:-3306}" -u "$MYSQL_USER" "$DATABASE_NAME" < setup-mysql-database.sql 2>/dev/null
    else
        mysql -h "$MYSQL_HOST" -P "${MYSQL_PORT:-3306}" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$DATABASE_NAME" < setup-mysql-database.sql 2>/dev/null
    fi
fi

# Update Spring configuration
echo "Configuring Spring application..."
cat > src/main/resources/application.properties << EOF
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://$MYSQL_HOST:${MYSQL_PORT:-3306}/$DATABASE_NAME
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

echo ""
echo "✅ MySQL setup complete!"
echo ""
echo "Database Details:"
echo "  Host: $MYSQL_HOST"
echo "  Port: ${MYSQL_PORT:-3306}"
echo "  Database: $DATABASE_NAME"
echo "  User: $MYSQL_USER"
echo ""
echo "Ready to start Java backend:"
echo "./run-java-backend.sh"