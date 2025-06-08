-- MySQL Database Setup for Business Analysis Dashboard
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS businessanaysisdb;
USE businessanaysisdb;

-- Create user for the application (optional)
-- CREATE USER 'businessapp'@'localhost' IDENTIFIED BY 'your_password';
-- GRANT ALL PRIVILEGES ON businessanaysisdb.* TO 'businessapp'@'localhost';
-- FLUSH PRIVILEGES;

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT IGNORE INTO customers (id, name, email, phone, address) VALUES
(1, 'John Smith', 'john@example.com', '+1-555-0101', '123 Main St, New York, NY'),
(2, 'Jane Doe', 'jane@example.com', '+1-555-0102', '456 Oak Ave, Los Angeles, CA'),
(3, 'Bob Wilson', 'bob@example.com', '+1-555-0103', '789 Pine Rd, Chicago, IL'),
(4, 'Alice Brown', 'alice@example.com', '+1-555-0104', '321 Elm St, Houston, TX'),
(5, 'Charlie Davis', 'charlie@example.com', '+1-555-0105', '654 Maple Dr, Phoenix, AZ');

INSERT IGNORE INTO products (id, name, description, price, category, stock_quantity) VALUES
(1, 'Premium Software License', 'Annual license for premium business software', 299.99, 'Software', 50),
(2, 'Hardware Kit', 'Complete hardware setup kit for office', 799.99, 'Hardware', 25),
(3, 'Consulting Service', 'Professional business consulting package', 199.99, 'Services', 100),
(4, 'Training Program', 'Comprehensive training program for teams', 149.99, 'Education', 75),
(5, 'Support Package', 'Annual technical support package', 99.99, 'Support', 200);

INSERT IGNORE INTO sales (product_id, customer_id, quantity, unit_price, total_amount) VALUES
(1, 1, 2, 299.99, 599.98),
(2, 2, 1, 799.99, 799.99),
(3, 3, 3, 199.99, 599.97),
(4, 4, 1, 149.99, 149.99),
(5, 5, 5, 99.99, 499.95),
(1, 3, 1, 299.99, 299.99),
(3, 1, 2, 199.99, 399.98);

-- Show tables and data
SHOW TABLES;
SELECT 'Customers' as TableName, COUNT(*) as RecordCount FROM customers
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Sales', COUNT(*) FROM sales;