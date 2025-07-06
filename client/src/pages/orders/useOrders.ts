import { useQuery } from "@tanstack/react-query";
import { tradingService } from "@/services/tradingService";
import { useOrderPad } from "@/contexts/OrderPadContext";
import { useFabOrder } from "@/contexts/FabOrderContext";
import { useEffect } from "react";

export function useOrders() {
  const { openOrderPad } = useOrderPad();
  const { setSelectedStock } = useFabOrder();
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery({
    queryKey: ["/api/orders"],
    queryFn: tradingService.getOrders,
  });

  const {
    data: portfolio,
    isLoading: portfolioLoading,
    error: portfolioError,
  } = useQuery({
    queryKey: ["/api/portfolio"],
    queryFn: tradingService.getPortfolio,
  });

  const handleStockClick = (
    symbol: string,
    price: number,
    companyName: string = ""
  ) => {
    openOrderPad({ symbol, ltp: price, companyName });
  };

  const getFirstStock = () => {
    if (orders && orders.length > 0) {
      const firstOrder = orders[0];
      return {
        symbol: firstOrder.symbol,
        ltp: parseFloat(firstOrder.price || "0"),
        companyName: firstOrder.symbol,
      };
    }
    return {
      symbol: "TCS",
      ltp: 3567.5,
      companyName: "Tata Consultancy Services",
    };
  };

  useEffect(() => {
    const stock = getFirstStock();
    if (stock) {
      setSelectedStock(stock);
    }
  }, [orders]);

  return {
    orders: orders || [],
    portfolio: portfolio,
    isLoading: ordersLoading || portfolioLoading,
    error: ordersError || portfolioError,
    handleStockClick,
  };
}
