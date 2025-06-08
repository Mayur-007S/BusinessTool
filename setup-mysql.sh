#!/bin/bash

echo "Setting up MySQL Database for Business Dashboard"
echo "==============================================="

# Test MySQL connection with different common configurations
test_mysql() {
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

# Try different MySQL configurations
MYSQL_CONNECTED=false

# Test local MySQL without password
if test_mysql "localhost" "3306" "root" ""; then
    echo "✅ Connected to MySQL as root (no password)"
    MYSQL_HOST="localhost"
    MYSQL_PORT="3306"
    MYSQL_USER="root"
    MYSQL_PASSWORD=""
    MYSQL_CONNECTED=true
fi

# Test with common passwords if no password didn't work
if [ "$MYSQL_CONNECTED" = false ]; then
    for pwd in "password" "root" "mysql"; do
        if test_mysql "localhost" "3306" "root" "$pwd"; then
            echo "✅ Connected to MySQL as root with password"
            MYSQL_HOST="localhost"
            MYSQL_PORT="3306"
            MYSQL_USER="root"
            MYSQL_PASSWORD="$pwd"
            MYSQL_CONNECTED=true
            break
        fi
    done
fi

# Test MariaDB socket connection
if [ "$MYSQL_CONNECTED" = false ]; then
    if mysql -u root -e "SELECT 1;" 2>/dev/null; then
        echo "✅ Connected to MariaDB via socket"
        MYSQL_HOST="localhost"
        MYSQL_PORT="3306"
        MYSQL_USER="root"
        MYSQL_PASSWORD=""
        MYSQL_CONNECTED=true
    fi
fi

if [ "$MYSQL_CONNECTED" = false ]; then
    echo "❌ Could not connect to MySQL/MariaDB"
    echo "Please ensure MySQL is running and accessible"
    exit 1
fi

# Create database
echo "Creating database 'businessanalysisdb'..."
if [ -z "$MYSQL_PASSWORD" ]; then
    mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -e "CREATE DATABASE IF NOT EXISTS businessanalysisdb;"
else
    mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS businessanalysisdb;"
fi

if [ $? -eq 0 ]; then
    echo "✅ Database 'businessanalysisdb' created successfully"
else
    echo "❌ Failed to create database"
    exit 1
fi

# Update environment configuration
cat > .env << EOF
USE_MYSQL=true
MYSQL_HOST=$MYSQL_HOST
MYSQL_PORT=$MYSQL_PORT
MYSQL_USER=$MYSQL_USER
MYSQL_PASSWORD=$MYSQL_PASSWORD
MYSQL_DATABASE=businessanalysisdb
EOF

echo ""
echo "✅ MySQL setup complete!"
echo "Database Configuration:"
echo "  Host: $MYSQL_HOST"
echo "  Port: $MYSQL_PORT"
echo "  User: $MYSQL_USER"
echo "  Database: businessanalysisdb"
echo ""
echo "Environment variables updated in .env file"
echo "Application will now use MySQL database on next restart"