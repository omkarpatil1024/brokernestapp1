import { useQuery } from "@tanstack/react-query";
import { tradingService } from "@/services/tradingService";

export function useOrders() {
  const ordersQuery = useQuery({
    queryKey: ["/api/orders"],
    queryFn: tradingService.getOrders,
  });

  const portfolioQuery = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: tradingService.getPortfolio,
  });

  return {
    orders: ordersQuery.data || [],
    portfolio: portfolioQuery.data,
    isLoading: ordersQuery.isLoading || portfolioQuery.isLoading,
    error: ordersQuery.error || portfolioQuery.error,
  };
}