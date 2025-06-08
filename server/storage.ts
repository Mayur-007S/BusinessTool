import { 
  customers, 
  products, 
  sales, 
  type Customer, 
  type InsertCustomer,
  type Product,
  type InsertProduct,
  type Sale,
  type InsertSale,
  type SaleWithDetails,
  type DashboardStats
} from "@shared/schema";
import { drizzle } from "drizzle-orm/mysql2";
import { drizzle as drizzleSQLite } from "drizzle-orm/better-sqlite3";
import { eq, gte, lte, sql } from "drizzle-orm";
import mysql from "mysql2/promise";
import Database from "better-sqlite3";

export interface IStorage {
  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: number): Promise<boolean>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Sales
  getSales(): Promise<SaleWithDetails[]>;
  getSale(id: number): Promise<SaleWithDetails | undefined>;
  createSale(sale: InsertSale): Promise<Sale>;
  deleteSale(id: number): Promise<boolean>;

  // Dashboard
  getDashboardStats(dateRange?: { start: Date; end: Date }): Promise<DashboardStats>;
  getSalesInDateRange(dateRange: { start: Date; end: Date }): Promise<SaleWithDetails[]>;
}

export class MemStorage implements IStorage {
  private customers: Map<number, Customer>;
  private products: Map<number, Product>;
  private sales: Map<number, Sale>;
  private currentCustomerId: number;
  private currentProductId: number;
  private currentSaleId: number;

  constructor() {
    this.customers = new Map();
    this.products = new Map();
    this.sales = new Map();
    this.currentCustomerId = 1;
    this.currentProductId = 1;
    this.currentSaleId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample customers
    const sampleCustomers = [
      { name: "John Smith", email: "john@example.com", phone: "+1 (555) 123-4567", address: "123 Business Ave, New York, NY" },
      { name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 (555) 987-6543", address: "456 Commerce St, San Francisco, CA" },
      { name: "Michael Chen", email: "michael@example.com", phone: "+1 (555) 456-7890", address: "789 Market Rd, Chicago, IL" },
      { name: "Emily Davis", email: "emily@example.com", phone: "+1 (555) 234-5678", address: "101 Enterprise Blvd, Austin, TX" },
      { name: "Robert Wilson", email: "robert@example.com", phone: "+1 (555) 876-5432", address: "202 Industry Lane, Seattle, WA" },
    ];

    sampleCustomers.forEach(customer => {
      const id = this.currentCustomerId++;
      this.customers.set(id, { ...customer, id });
    });

    // Sample products
    const sampleProducts = [
      { name: "Premium Software License", category: "Software", price: "299.99", stock: 145, status: "In Stock" },
      { name: "Business Analytics Package", category: "Software", price: "149.99", stock: 89, status: "In Stock" },
      { name: "Cloud Storage Plan (1TB)", category: "Services", price: "49.99", stock: 230, status: "In Stock" },
      { name: "Enterprise Security Suite", category: "Software", price: "399.99", stock: 12, status: "Low Stock" },
      { name: "Custom Integration Service", category: "Services", price: "499.99", stock: 0, status: "Out of Stock" },
    ];

    sampleProducts.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });

    // Sample sales
    const sampleSales = [
      { productId: 1, customerId: 1, quantity: 2, price: "299.99", total: "599.98", date: new Date("2025-06-07") },
      { productId: 2, customerId: 2, quantity: 1, price: "149.99", total: "149.99", date: new Date("2025-06-06") },
      { productId: 3, customerId: 3, quantity: 5, price: "49.99", total: "249.95", date: new Date("2025-06-05") },
      { productId: 4, customerId: 4, quantity: 1, price: "399.99", total: "399.99", date: new Date("2025-06-04") },
      { productId: 5, customerId: 5, quantity: 1, price: "499.99", total: "499.99", date: new Date("2025-06-03") },
    ];

    sampleSales.forEach(sale => {
      const id = this.currentSaleId++;
      this.sales.set(id, { ...sale, id });
    });
  }

  // Customer methods
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const newCustomer: Customer = { 
      ...customer, 
      id,
      phone: customer.phone || null,
      address: customer.address || null
    };
    this.customers.set(id, newCustomer);
    return newCustomer;
  }

  async updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const existing = this.customers.get(id);
    if (!existing) return undefined;
    
    const updated: Customer = { ...existing, ...customer };
    this.customers.set(id, updated);
    return updated;
  }

  async deleteCustomer(id: number): Promise<boolean> {
    return this.customers.delete(id);
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = { 
      ...product, 
      id,
      status: product.status || "In Stock",
      stock: product.stock || 0
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = { ...existing, ...product };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Sale methods
  async getSales(): Promise<SaleWithDetails[]> {
    const salesArray = Array.from(this.sales.values());
    return salesArray.map(sale => {
      const product = this.products.get(sale.productId);
      const customer = this.customers.get(sale.customerId);
      return {
        ...sale,
        productName: product?.name || "Unknown Product",
        customerName: customer?.name || "Unknown Customer"
      };
    });
  }

  async getSale(id: number): Promise<SaleWithDetails | undefined> {
    const sale = this.sales.get(id);
    if (!sale) return undefined;
    
    const product = this.products.get(sale.productId);
    const customer = this.customers.get(sale.customerId);
    return {
      ...sale,
      productName: product?.name || "Unknown Product",
      customerName: customer?.name || "Unknown Customer"
    };
  }

  async createSale(sale: InsertSale): Promise<Sale> {
    const id = this.currentSaleId++;
    const newSale: Sale = { ...sale, id, date: new Date() };
    this.sales.set(id, newSale);
    return newSale;
  }

  async deleteSale(id: number): Promise<boolean> {
    return this.sales.delete(id);
  }

  // Dashboard methods
  async getDashboardStats(dateRange?: { start: Date; end: Date }): Promise<DashboardStats> {
    let salesArray = Array.from(this.sales.values());
    
    if (dateRange) {
      salesArray = salesArray.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= dateRange.start && saleDate <= dateRange.end;
      });
    }
    
    const totalRevenue = salesArray.reduce((sum, sale) => sum + parseFloat(sale.total), 0);
    
    return {
      totalRevenue: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      activeCustomers: this.customers.size,
      salesThisMonth: salesArray.length,
      inventoryItems: Array.from(this.products.values()).reduce((sum, product) => sum + product.stock, 0)
    };
  }

  async getSalesInDateRange(dateRange: { start: Date; end: Date }): Promise<SaleWithDetails[]> {
    const salesArray = Array.from(this.sales.values());
    const filteredSales = salesArray.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= dateRange.start && saleDate <= dateRange.end;
    });

    return filteredSales.map(sale => {
      const product = this.products.get(sale.productId);
      const customer = this.customers.get(sale.customerId);
      return {
        ...sale,
        productName: product?.name || "Unknown Product",
        customerName: customer?.name || "Unknown Customer"
      };
    });
  }
}

// MySQL Storage Implementation
export class MySQLStorage implements IStorage {
  private db: any;

  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      // Create MySQL connection
      const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || "localhost",
        port: parseInt(process.env.MYSQL_PORT || "3306"),
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "businessanalysisdb",
      });

      this.db = drizzle(connection);
      
      // Create tables if they don't exist
      await this.createTables();
      await this.seedInitialData();
      
      console.log("✅ MySQL database connected and initialized");
    } catch (error) {
      console.error("❌ MySQL connection failed:", error);
      console.log("Falling back to in-memory storage");
      // Fall back to in-memory storage if MySQL fails
      return;
    }
  }

  private async createTables() {
    try {
      // Create customers table
      await this.db.execute(sql`
        CREATE TABLE IF NOT EXISTS customers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          phone VARCHAR(50),
          address VARCHAR(500)
        )
      `);

      // Create products table
      await this.db.execute(sql`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          stock INT NOT NULL DEFAULT 0,
          status VARCHAR(50) NOT NULL DEFAULT 'In Stock'
        )
      `);

      // Create sales table
      await this.db.execute(sql`
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
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  }

  private async seedInitialData() {
    try {
      // Check if data already exists
      const existingCustomers = await this.db.select().from(customers).limit(1);
      if (existingCustomers.length > 0) return;

      // Insert sample customers
      await this.db.insert(customers).values([
        { name: "John Smith", email: "john@example.com", phone: "(555) 123-4567", address: "123 Main St, Anytown, USA" },
        { name: "Sarah Johnson", email: "sarah@example.com", phone: "(555) 987-6543", address: "456 Oak Ave, Somewhere, USA" },
        { name: "Mike Wilson", email: "mike@example.com", phone: "(555) 555-0123", address: "789 Pine Rd, Elsewhere, USA" },
      ]);

      // Insert sample products
      await this.db.insert(products).values([
        { name: "Premium Software License", category: "Software", price: "299.99", stock: 50, status: "In Stock" },
        { name: "Professional Consultation", category: "Services", price: "150.00", stock: 100, status: "Available" },
        { name: "Hardware Kit", category: "Hardware", price: "89.95", stock: 25, status: "In Stock" },
        { name: "Training Package", category: "Education", price: "199.99", stock: 30, status: "Available" },
      ]);

      // Insert sample sales
      await this.db.insert(sales).values([
        { productId: 1, customerId: 1, quantity: 2, price: "299.99", total: "599.98" },
        { productId: 2, customerId: 2, quantity: 1, price: "150.00", total: "150.00" },
        { productId: 3, customerId: 3, quantity: 3, price: "89.95", total: "269.85" },
        { productId: 4, customerId: 1, quantity: 1, price: "199.99", total: "199.99" },
        { productId: 1, customerId: 2, quantity: 1, price: "299.99", total: "299.99" },
        { productId: 2, customerId: 3, quantity: 2, price: "150.00", total: "300.00" },
      ]);

      console.log("✅ Sample data inserted into MySQL database");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  }

  // Customer methods
  async getCustomers(): Promise<Customer[]> {
    if (!this.db) return [];
    return await this.db.select().from(customers);
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    if (!this.db) return undefined;
    const result = await this.db.select().from(customers).where(eq(customers.id, id));
    return result[0];
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    if (!this.db) throw new Error("Database not available");
    const result = await this.db.insert(customers).values(customer);
    const newCustomer = await this.getCustomer(result[0].insertId);
    return newCustomer!;
  }

  async updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined> {
    if (!this.db) return undefined;
    await this.db.update(customers).set(customer).where(eq(customers.id, id));
    return await this.getCustomer(id);
  }

  async deleteCustomer(id: number): Promise<boolean> {
    if (!this.db) return false;
    const result = await this.db.delete(customers).where(eq(customers.id, id));
    return result.affectedRows > 0;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    if (!this.db) return [];
    return await this.db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    if (!this.db) return undefined;
    const result = await this.db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    if (!this.db) throw new Error("Database not available");
    const result = await this.db.insert(products).values(product);
    const newProduct = await this.getProduct(result[0].insertId);
    return newProduct!;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    if (!this.db) return undefined;
    await this.db.update(products).set(product).where(eq(products.id, id));
    return await this.getProduct(id);
  }

  async deleteProduct(id: number): Promise<boolean> {
    if (!this.db) return false;
    const result = await this.db.delete(products).where(eq(products.id, id));
    return result.affectedRows > 0;
  }

  // Sales methods
  async getSales(): Promise<SaleWithDetails[]> {
    if (!this.db) return [];
    const result = await this.db
      .select({
        id: sales.id,
        productId: sales.productId,
        customerId: sales.customerId,
        quantity: sales.quantity,
        price: sales.price,
        total: sales.total,
        date: sales.date,
        productName: products.name,
        customerName: customers.name,
      })
      .from(sales)
      .leftJoin(products, eq(sales.productId, products.id))
      .leftJoin(customers, eq(sales.customerId, customers.id));
    
    return result;
  }

  async getSale(id: number): Promise<SaleWithDetails | undefined> {
    if (!this.db) return undefined;
    const result = await this.db
      .select({
        id: sales.id,
        productId: sales.productId,
        customerId: sales.customerId,
        quantity: sales.quantity,
        price: sales.price,
        total: sales.total,
        date: sales.date,
        productName: products.name,
        customerName: customers.name,
      })
      .from(sales)
      .leftJoin(products, eq(sales.productId, products.id))
      .leftJoin(customers, eq(sales.customerId, customers.id))
      .where(eq(sales.id, id));
    
    return result[0];
  }

  async createSale(sale: InsertSale): Promise<Sale> {
    if (!this.db) throw new Error("Database not available");
    const result = await this.db.insert(sales).values(sale);
    const newSale = await this.db.select().from(sales).where(eq(sales.id, result[0].insertId));
    return newSale[0];
  }

  async deleteSale(id: number): Promise<boolean> {
    if (!this.db) return false;
    const result = await this.db.delete(sales).where(eq(sales.id, id));
    return result.affectedRows > 0;
  }

  // Dashboard methods
  async getDashboardStats(dateRange?: { start: Date; end: Date }): Promise<DashboardStats> {
    if (!this.db) {
      return {
        totalRevenue: "$0.00",
        activeCustomers: 0,
        salesThisMonth: 0,
        inventoryItems: 0
      };
    }

    let salesQuery = this.db.select().from(sales);
    
    if (dateRange) {
      salesQuery = salesQuery.where(
        sql`${sales.date} >= ${dateRange.start} AND ${sales.date} <= ${dateRange.end}`
      );
    }

    const salesData = await salesQuery;
    const totalRevenue = salesData.reduce((sum: number, sale: any) => sum + parseFloat(sale.total), 0);
    
    const customersData = await this.db.select().from(customers);
    const productsData = await this.db.select().from(products);
    const inventoryItems = productsData.reduce((sum: number, product: any) => sum + product.stock, 0);

    return {
      totalRevenue: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      activeCustomers: customersData.length,
      salesThisMonth: salesData.length,
      inventoryItems: inventoryItems
    };
  }

  async getSalesInDateRange(dateRange: { start: Date; end: Date }): Promise<SaleWithDetails[]> {
    if (!this.db) return [];
    
    const result = await this.db
      .select({
        id: sales.id,
        productId: sales.productId,
        customerId: sales.customerId,
        quantity: sales.quantity,
        price: sales.price,
        total: sales.total,
        date: sales.date,
        productName: products.name,
        customerName: customers.name,
      })
      .from(sales)
      .leftJoin(products, eq(sales.productId, products.id))
      .leftJoin(customers, eq(sales.customerId, customers.id))
      .where(
        sql`${sales.date} >= ${dateRange.start} AND ${sales.date} <= ${dateRange.end}`
      );
    
    return result;
  }
}

// Choose storage implementation based on environment
export const storage = process.env.USE_MYSQL === 'true' ? new MySQLStorage() : new MemStorage();
