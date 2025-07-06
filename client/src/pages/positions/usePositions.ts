import { useQuery } from "@tanstack/react-query";
import { tradingService } from "@/services/tradingService";
import { useOrderPad } from "@/contexts/OrderPadContext";
import { useFabOrder } from "@/contexts/FabOrderContext";
import { useEffect } from "react";

export function usePositions() {
    const { openOrderPad } = useOrderPad();
    const { setSelectedStock } = useFabOrder();
    
  const {data: positions, isLoading: positionsLoading, error: positionsError} = useQuery({
    queryKey: ["/api/positions"],
    queryFn: tradingService.getPositions,
  });

  const {data: portfolio, isLoading: portfolioLoading, error: portfolioError} = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: tradingService.getPortfolio,
  });

  const handleStockClick = (symbol: string, ltp: number, companyName: string) => {
    openOrderPad({ symbol, ltp, companyName });
  };

  const getFirstStock = () => {
    if (positions && positions.length > 0) {
      const firstPosition = positions[0];
      return {
        symbol: firstPosition.symbol,
        ltp: parseFloat(firstPosition.ltp),
        companyName: firstPosition.companyName
      };
    }
  };


  
  useEffect(() => {
    const firstStock = getFirstStock();
    if (firstStock) { 
      setSelectedStock(firstStock);
    }
  }, [positions]);
  
  return {
    positions: positions || [],
    portfolio: portfolio,
    isLoading: positionsLoading || portfolioLoading,
    error: positionsError || portfolioError,
    handleStockClick,
  };
}