#!/bin/bash

echo "Configuring MySQL Connection for Business Dashboard"
echo "================================================="

# Set database configuration
DATABASE_NAME="businessanaysisdb"
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="root"

# Create Spring Boot configuration for MySQL
echo "Creating MySQL configuration..."
cat > src/main/resources/application.properties << EOF
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/businessanaysisdb?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
mysql.username=root
mysql.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate Configuration for MySQL
hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
hibernate.hbm2ddl.auto=create-drop
hibernate.show_sql=true
hibernate.format_sql=true
hibernate.connection.CharSet=utf8mb4
hibernate.connection.characterEncoding=utf8
hibernate.connection.useUnicode=true

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

echo "✅ MySQL configuration created"
echo ""
echo "Configuration Details:"
echo "  Database URL: jdbc:mysql://localhost:3306/businessanaysisdb"
echo "  Username: root"
echo "  Password: (empty - will use your local MySQL setup)"
echo "  Hibernate: Will auto-create tables on startup"
echo ""
echo "The Java backend will:"
echo "1. Connect to your local MySQL on port 3306"
echo "2. Create the 'businessanaysisdb' database if needed"
echo "3. Auto-generate all tables using Hibernate"
echo "4. Start the API server on port 8080"
echo ""
echo "To start the backend: ./run-java-backend.sh"