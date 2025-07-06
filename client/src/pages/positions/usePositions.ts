import { useQuery } from "@tanstack/react-query";
import { tradingService } from "@/services/tradingService";

export function usePositions() {
  const positionsQuery = useQuery({
    queryKey: ["/api/positions"],
    queryFn: tradingService.getPositions,
  });

  const portfolioQuery = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: tradingService.getPortfolio,
  });

  return {
    positions: positionsQuery.data || [],
    portfolio: portfolioQuery.data,
    isLoading: positionsQuery.isLoading || portfolioQuery.isLoading,
    error: positionsQuery.error || portfolioQuery.error,
  };
}