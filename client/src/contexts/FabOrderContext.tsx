import React, { createContext, useContext, useState, ReactNode } from "react";
import { Stock } from "@/types/trading";

type FabOrderContextType = {
  isFabModalOpen: boolean;
  selectedStock: Stock | null;
  orderType: "BUY" | "SELL";
  openFabModal: (orderType: "BUY" | "SELL", stock?: Stock | null) => void;
  closeFabModal: () => void;
  setSelectedStock: (stock: Stock | null) => void;
};

const FabOrderContext = createContext<FabOrderContextType>({
  isFabModalOpen: false,
  selectedStock: null,
  orderType: "BUY",
  openFabModal: () => {},
  closeFabModal: () => {},
  setSelectedStock: () => {},
});

export function FabOrderProvider({ children }: { children: ReactNode }) {
  const [isFabModalOpen, setIsFabModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");

  const openFabModal = (type: "BUY" | "SELL", stock: Stock | null = null) => {
    setOrderType(type);
    setSelectedStock(stock);
    setIsFabModalOpen(true);
  };

  const closeFabModal = () => {
    setIsFabModalOpen(false);
  };

  return (
    <FabOrderContext.Provider
      value={{
        isFabModalOpen,
        selectedStock,
        orderType,
        openFabModal,
        closeFabModal,
        setSelectedStock,
      }}
    >
      {children}
    </FabOrderContext.Provider>
  );
}

export const useFabOrder = () => useContext(FabOrderContext);
