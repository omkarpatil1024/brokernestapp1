import { apiRequest } from "@/lib/queryClient";
import type { Holding, Order, Position } from "@shared/schema";
import type { OrderFormData, PortfolioSummary } from "@/types/trading";

export const tradingService = {
  getHoldings: async (): Promise<Holding[]> => {
    const response = await fetch("/api/holdings");
    return response.json();
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await fetch("/api/orders");
    return response.json();
  },

  getPositions: async (): Promise<Position[]> => {
    const response = await fetch("/api/positions");
    return response.json();
  },

  getPortfolio: async (): Promise<PortfolioSummary> => {
    const response = await fetch("/api/portfolio");
    return response.json();
  },

  placeOrder: async (orderData: OrderFormData): Promise<{ order: Order; message: string }> => {
    const response = await apiRequest("POST", "/api/orders", orderData);
    return response.json();
  },
};