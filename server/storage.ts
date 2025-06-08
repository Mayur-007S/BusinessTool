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

export const storage = new MemStorage();
