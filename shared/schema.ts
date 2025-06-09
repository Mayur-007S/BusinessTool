import { mysqlTable, varchar, int, decimal, timestamp, json, index } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = mysqlTable(
  "sessions",
  {
    sid: varchar("sid", { length: 255 }).primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  email: varchar("email", { length: 255 }).unique(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  profileImageUrl: varchar("profile_image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const customers = mysqlTable("customers", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  address: varchar("address", { length: 500 }),
});

export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: int("stock").notNull().default(0),
  status: varchar("status", { length: 50 }).notNull().default("In Stock"),
});

export const sales = mysqlTable("sales", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").notNull(),
  customerId: int("customer_id").notNull(),
  quantity: int("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

// Insert schemas
export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
}).extend({
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertSaleSchema = createInsertSchema(sales).omit({
  id: true,
  date: true,
});

// User types for Replit Auth
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Types
export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Sale = typeof sales.$inferSelect;
export type InsertSale = z.infer<typeof insertSaleSchema>;

// Extended types for API responses
export type SaleWithDetails = Sale & {
  productName: string;
  customerName: string;
};

export type DashboardStats = {
  totalRevenue: string;
  activeCustomers: number;
  salesThisMonth: number;
  inventoryItems: number;
};
