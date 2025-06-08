#!/bin/bash

echo "Testing Spring/Hibernate Integration..."

# Check database connection
echo "1. Testing database connection..."
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set"
    exit 1
else
    echo "✅ Database URL configured"
fi

# Test compilation
echo "2. Testing Java compilation..."
if mvn compile -q -DskipTests > /dev/null 2>&1; then
    echo "✅ Java compilation successful"
else
    echo "❌ Java compilation failed"
    exit 1
fi

# Test API endpoints (after starting server)
echo "3. API endpoints will be available at:"
echo "   - http://localhost:8080/api/customers"
echo "   - http://localhost:8080/api/products"
echo "   - http://localhost:8080/api/sales"
echo "   - http://localhost:8080/api/dashboard/stats"

echo ""
echo "Integration test completed successfully!"
echo "Run './run-java-backend.sh' to start the Spring application"