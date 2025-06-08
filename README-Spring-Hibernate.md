# Business Dashboard - Spring/Hibernate Backend Integration

This project now includes a complete Java Spring/Hibernate backend alongside the existing Node.js frontend. Both systems can run independently or together.

## Architecture Overview

### Current Setup
- **Frontend**: React with Vite (runs on port 5000)
- **Node.js Backend**: Express.js with in-memory storage (integrated with frontend)
- **Java Backend**: Spring Framework + Hibernate ORM + PostgreSQL (runs on port 8080)

## Java Spring/Hibernate Components

### Entities
- `Customer.java` - Customer entity with validation
- `Product.java` - Product entity with stock management
- `Sale.java` - Sales transactions with relationships

### Data Access Layer (DAO)
- `CustomerDAO.java` - Customer database operations
- `ProductDAO.java` - Product database operations  
- `SaleDAO.java` - Sales database operations with advanced queries

### Service Layer
- `CustomerService.java` - Business logic for customer management
- `ProductService.java` - Product and inventory management
- `SaleService.java` - Sales processing and reporting
- `DashboardService.java` - Analytics and dashboard statistics

### REST Controllers
- `CustomerController.java` - Customer API endpoints
- `ProductController.java` - Product API endpoints
- `SaleController.java` - Sales API endpoints
- `DashboardController.java` - Dashboard statistics API

### Configuration
- `AppConfig.java` - Spring configuration with Hibernate setup
- `application.properties` - Database and application settings

## API Endpoints (Java Backend - Port 8080)

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/customers/search?email={email}` - Search by email

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?name={name}` - Search products by name
- `GET /api/products/low-stock?threshold={number}` - Get low stock products

### Sales
- `GET /api/sales` - Get all sales with details
- `GET /api/sales/{id}` - Get sale by ID
- `POST /api/sales` - Create new sale
- `DELETE /api/sales/{id}` - Delete sale
- `GET /api/sales/date-range?startDate={date}&endDate={date}` - Sales by date range
- `GET /api/sales/customer/{customerId}` - Sales by customer
- `GET /api/sales/product/{productId}` - Sales by product

### Dashboard
- `GET /api/dashboard/stats?startDate={date}&endDate={date}` - Dashboard statistics

## Running the Applications

### Option 1: Node.js Frontend + Backend (Current)
```bash
npm run dev
```
- Runs on port 5000
- Uses in-memory storage
- Fully functional dashboard

### Option 2: Java Spring/Hibernate Backend
```bash
./run-java-backend.sh
```
- Runs on port 8080
- Uses PostgreSQL database
- RESTful API with Hibernate ORM

### Option 3: Both Systems (Recommended for Development)
Terminal 1:
```bash
npm run dev  # Node.js frontend (port 5000)
```

Terminal 2:
```bash
./run-java-backend.sh  # Java backend (port 8080)
```

## Database Configuration

The Java backend uses environment variables for database connection:
- `DATABASE_URL` - PostgreSQL connection string
- `PGUSER` - Database username
- `PGPASSWORD` - Database password
- `PGHOST` - Database host
- `PGPORT` - Database port
- `PGDATABASE` - Database name

## Key Features

### Spring Framework Integration
- Dependency injection with `@Autowired`
- Transaction management with `@Transactional`
- RESTful web services with `@RestController`
- Component scanning and configuration

### Hibernate ORM Features
- Entity relationships (`@OneToMany`, `@ManyToOne`)
- Query generation with HQL
- Connection pooling with HikariCP
- Automatic schema updates
- SQL logging for debugging

### Validation & Error Handling
- Bean validation with Jakarta annotations
- Custom exception handling
- HTTP status code responses
- Input validation on all endpoints

### Business Logic
- Revenue calculations and analytics
- Inventory management with stock tracking
- Customer relationship management
- Sales reporting with date ranges

## Database Schema

The Hibernate entities automatically create these tables:
- `customers` - Customer information
- `products` - Product catalog with inventory
- `sales` - Sales transactions with foreign keys

## Development Workflow

1. **Frontend Development**: Use the Node.js setup for rapid UI development
2. **Backend Development**: Use the Java Spring setup for robust API development
3. **Integration**: Connect frontend to Java backend by updating API endpoints
4. **Testing**: Use both systems to verify functionality

## Migration Path

To fully migrate from Node.js to Java backend:
1. Update frontend API calls to point to port 8080
2. Test all functionality with Java backend
3. Deploy Java application to production
4. Update deployment configuration

## Dependencies

### Java Dependencies (Maven)
- Spring Framework 6.1.0
- Hibernate ORM 6.4.0
- PostgreSQL Driver 42.7.1
- Jackson JSON Processing 2.16.0
- Jakarta Validation API 3.0.2
- Eclipse Jetty 11.0.18

### Build Tools
- Maven 3.x
- Java 21
- PostgreSQL database

This integration provides a solid foundation for scaling the business dashboard with enterprise-grade Java technologies while maintaining the existing Node.js functionality.