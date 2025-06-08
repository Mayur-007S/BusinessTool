import mysql from 'mysql2/promise';
import fs from 'fs';

async function testConnection() {
  console.log('Testing MySQL database connection...');
  
  try {
    // Try to connect with default settings
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'mysql' // Connect to default mysql database first
    });

    console.log('✅ MySQL connection successful');
    
    // Create business database
    await connection.execute('CREATE DATABASE IF NOT EXISTS businessanalysisdb');
    console.log('✅ Database businessanalysisdb created');
    
    // Switch to business database
    await connection.changeUser({ database: 'businessanalysisdb' });
    
    // Create tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        address VARCHAR(500)
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        status VARCHAR(50) NOT NULL DEFAULT 'In Stock'
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        customer_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      )
    `);
    
    console.log('✅ Database tables created');
    
    // Check if data exists
    const [customers] = await connection.execute('SELECT COUNT(*) as count FROM customers');
    if (customers[0].count === 0) {
      // Insert sample data
      await connection.execute(`
        INSERT INTO customers (name, email, phone, address) VALUES
        ('John Smith', 'john@example.com', '(555) 123-4567', '123 Main St, Anytown, USA'),
        ('Sarah Johnson', 'sarah@example.com', '(555) 987-6543', '456 Oak Ave, Somewhere, USA'),
        ('Mike Wilson', 'mike@example.com', '(555) 555-0123', '789 Pine Rd, Elsewhere, USA')
      `);
      
      await connection.execute(`
        INSERT INTO products (name, category, price, stock, status) VALUES
        ('Premium Software License', 'Software', 299.99, 50, 'In Stock'),
        ('Professional Consultation', 'Services', 150.00, 100, 'Available'),
        ('Hardware Kit', 'Hardware', 89.95, 25, 'In Stock'),
        ('Training Package', 'Education', 199.99, 30, 'Available')
      `);
      
      await connection.execute(`
        INSERT INTO sales (product_id, customer_id, quantity, price, total) VALUES
        (1, 1, 2, 299.99, 599.98),
        (2, 2, 1, 150.00, 150.00),
        (3, 3, 3, 89.95, 269.85),
        (4, 1, 1, 199.99, 199.99),
        (1, 2, 1, 299.99, 299.99),
        (2, 3, 2, 150.00, 300.00)
      `);
      
      console.log('✅ Sample data inserted');
    }
    
    await connection.end();
    
    // Update environment file
    const envContent = `USE_MYSQL=true
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=businessanalysisdb
`;
    fs.writeFileSync('.env', envContent);
    console.log('✅ Environment configuration updated');
    console.log('\nMySQL database is ready! Restart the application to use MySQL storage.');
    
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    console.log('Application will continue using in-memory storage');
  }
}

testConnection();