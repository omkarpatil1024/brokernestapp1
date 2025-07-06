import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  broker: text("broker").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const holdings = pgTable("holdings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  symbol: text("symbol").notNull(),
  quantity: integer("quantity").notNull(),
  avgPrice: decimal("avg_price", { precision: 10, scale: 2 }).notNull(),
  ltp: decimal("ltp", { precision: 10, scale: 2 }).notNull(),
  companyName: text("company_name").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  symbol: text("symbol").notNull(),
  orderType: text("order_type").notNull(),
  orderMode: text("order_mode").notNull(),
  product: text("product").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("PENDING"),
  validity: text("validity").notNull().default("DAY"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  symbol: text("symbol").notNull(),
  positionType: text("position_type").notNull(),
  quantity: integer("quantity").notNull(),
  entryPrice: decimal("entry_price", { precision: 10, scale: 2 }).notNull(),
  ltp: decimal("ltp", { precision: 10, scale: 2 }).notNull(),
  companyName: text("company_name").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  broker: true,
});

export const insertHoldingSchema = createInsertSchema(holdings).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertPositionSchema = createInsertSchema(positions).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Holding = typeof holdings.$inferSelect;
export type InsertHolding = z.infer<typeof insertHoldingSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Position = typeof positions.$inferSelect;
export type InsertPosition = z.infer<typeof insertPositionSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  broker: z.string().min(1, "Broker is required"),
});

export type LoginRequest = z.infer<typeof loginSchema>;
