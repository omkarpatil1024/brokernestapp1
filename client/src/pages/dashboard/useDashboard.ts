import { useQuery } from "@tanstack/react-query";
import { tradingService } from "@/services/tradingService";

export function useDashboard() {
  const holdingsQuery = useQuery({
    queryKey: ["/api/holdings"],
    queryFn: tradingService.getHoldings,
  });

  const portfolioQuery = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: tradingService.getPortfolio,
  });

  return {
    holdings: holdingsQuery.data || [],
    portfolio: portfolioQuery.data,
    isLoading: holdingsQuery.isLoading || portfolioQuery.isLoading,
    error: holdingsQuery.error || portfolioQuery.error,
  };
}