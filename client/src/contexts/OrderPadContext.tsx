import { Stock } from "@/types/trading";
import React, { createContext, useContext, useState, ReactNode } from "react";

type OrderPadContextType = {
  isOrderPadOpen: boolean;
  selectedStock: Stock | null;
  defaultOrderType: "BUY" | "SELL";
  openOrderPad: (stock: Stock, orderType?: "BUY" | "SELL") => void;
  closeOrderPad: () => void;
};

const OrderPadContext = createContext<OrderPadContextType>({
  isOrderPadOpen: false,
  selectedStock: null,
  defaultOrderType: "BUY",
  openOrderPad: () => {},
  closeOrderPad: () => {},
});

export function OrderPadProvider({ children }: { children: ReactNode }) {
  const [isOrderPadOpen, setIsOrderPadOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [defaultOrderType, setDefaultOrderType] = useState<"BUY" | "SELL">(
    "BUY"
  );

  const openOrderPad = (stock: Stock, orderType: "BUY" | "SELL" = "BUY") => {
    setSelectedStock(stock);
    setDefaultOrderType(orderType);
    setIsOrderPadOpen(true);
  };

  const closeOrderPad = () => {
    setIsOrderPadOpen(false);
  };

  return (
    <OrderPadContext.Provider
      value={{
        isOrderPadOpen,
        selectedStock,
        defaultOrderType,
        openOrderPad,
        closeOrderPad,
      }}
    >
      {children}
    </OrderPadContext.Provider>
  );
}

export const useOrderPad = () => useContext(OrderPadContext);
