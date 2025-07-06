import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password, broker } = loginSchema.parse(req.body);
      
      const user = await storage.authenticateUser(username, password, broker);
      
      if (!user) {
        return res.status(400).json({ 
          message: "Invalid credentials. Please check your User ID and Password." 
        });
      }
      
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          broker: user.broker 
        },
        message: "Login successful" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  app.get("/api/holdings", async (req, res) => {
    try {
      const userId = 1;
      const holdings = await storage.getUserHoldings(userId);
      res.json(holdings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch holdings" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const userId = 1;
      const orders = await storage.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/positions", async (req, res) => {
    try {
      const userId = 1;
      const positions = await storage.getUserPositions(userId);
      res.json(positions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch positions" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse({
        ...req.body,
        userId: 1,
      });
      
      const order = await storage.createOrder(orderData);
      res.json({ order, message: "Order placed successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid order data",
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: "Failed to place order" 
      });
    }
  });

  app.get("/api/portfolio", async (req, res) => {
    try {
      const userId = 1;
      const holdings = await storage.getUserHoldings(userId);
      
      let totalValue = 0;
      let totalInvested = 0;
      
      holdings.forEach(holding => {
        const currentValue = parseFloat(holding.ltp) * holding.quantity;
        const investedValue = parseFloat(holding.avgPrice) * holding.quantity;
        totalValue += currentValue;
        totalInvested += investedValue;
      });
      
      const totalPnL = totalValue - totalInvested;
      const pnlPercentage = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
      
      res.json({
        totalValue: totalValue.toFixed(2),
        totalInvested: totalInvested.toFixed(2),
        totalPnL: totalPnL.toFixed(2),
        pnlPercentage: pnlPercentage.toFixed(2),
        realizedPnL: "12450.00",
        unrealizedPnL: totalPnL.toFixed(2),
        todaysPnL: "3245.00",
        todaysLoss: "1120.00",
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
