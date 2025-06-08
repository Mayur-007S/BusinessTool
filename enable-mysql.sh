#!/bin/bash

echo "Enabling MySQL Database Connection"
echo "================================="

# Set environment variables for MySQL
export USE_MYSQL=true
export MYSQL_HOST=localhost
export MYSQL_PORT=3306
export MYSQL_USER=root
export MYSQL_PASSWORD=""
export MYSQL_DATABASE=businessanalysisdb

# Create .env file for persistent configuration
cat > .env << EOF
USE_MYSQL=true
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=businessanalysisdb
EOF

echo "✅ MySQL configuration enabled"
echo "Environment variables set:"
echo "  USE_MYSQL=true"
echo "  MYSQL_HOST=localhost"
echo "  MYSQL_PORT=3306"
echo "  MYSQL_USER=root"
echo "  MYSQL_DATABASE=businessanalysisdb"
echo ""
echo "The application will now use MySQL database instead of in-memory storage."
echo "Restart the application to apply changes: npm run dev"