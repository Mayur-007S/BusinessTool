import Database from 'better-sqlite3';

console.log('Testing SQLite Database Operations');
console.log('===================================');

try {
  const db = new Database('businessanalysis.db');
  
  // Test customer data
  const customers = db.prepare('SELECT * FROM customers').all();
  console.log(`✅ Customers: ${customers.length} records`);
  customers.forEach(c => console.log(`  - ${c.name} (${c.email})`));
  
  // Test product data
  const products = db.prepare('SELECT * FROM products').all();
  console.log(`✅ Products: ${products.length} records`);
  products.forEach(p => console.log(`  - ${p.name}: $${p.price} (Stock: ${p.stock})`));
  
  // Test sales data
  const sales = db.prepare('SELECT * FROM sales').all();
  console.log(`✅ Sales: ${sales.length} records`);
  
  // Test sales with details (JOIN query)
  const salesWithDetails = db.prepare(`
    SELECT s.*, p.name as product_name, c.name as customer_name
    FROM sales s
    LEFT JOIN products p ON s.product_id = p.id
    LEFT JOIN customers c ON s.customer_id = c.id
  `).all();
  
  console.log('Sales with details:');
  salesWithDetails.forEach(s => {
    console.log(`  - ${s.customer_name} bought ${s.quantity}x ${s.product_name} for $${s.total}`);
  });
  
  // Calculate total revenue
  const totalRevenue = sales.reduce((sum, sale) => sum + parseFloat(sale.total), 0);
  console.log(`💰 Total Revenue: $${totalRevenue.toFixed(2)}`);
  
  db.close();
  
  console.log('\n✅ Database integration successful!');
  console.log('The application is now using persistent SQLite storage.');
  
} catch (error) {
  console.error('❌ Database test failed:', error);
}