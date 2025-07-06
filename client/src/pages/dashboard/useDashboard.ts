import { useQuery } from "@tanstack/react-query";
import { tradingService } from "@/services/tradingService";
import { useEffect } from "react";
import { useFabOrder } from "@/contexts/FabOrderContext";
import { useOrderPad } from "@/contexts/OrderPadContext";

export function useDashboard() {
  const { setSelectedStock } = useFabOrder();
  const { openOrderPad } = useOrderPad();

  const {
    data: holdings,
    isLoading: holdingsLoading,
    error: holdingsError,
  } = useQuery({
    queryKey: ["/api/holdings"],
    queryFn: tradingService.getHoldings,
  });

  const getFirstStock = () => {
    if (holdings && holdings.length > 0) {
      const firstHolding = holdings[0];
      return {
        symbol: firstHolding.symbol,
        ltp: parseFloat(firstHolding.ltp),
        companyName: firstHolding.companyName,
      };
    }
  };

  useEffect(() => {
    const stock = getFirstStock();
    if (stock) {
      setSelectedStock(stock);
    }
  }, [holdings]);

  const portfolioQuery = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: tradingService.getPortfolio,
  });

  const handleStockClick = (symbol: string, ltp: number, companyName: string) => {
    openOrderPad({ symbol, ltp, companyName });
  };

  return {
    holdings: holdings || [],
    portfolio: portfolioQuery.data,
    isLoading: holdingsLoading || portfolioQuery.isLoading,
    error: holdingsError || portfolioQuery.error,
    handleStockClick,
  };
}
