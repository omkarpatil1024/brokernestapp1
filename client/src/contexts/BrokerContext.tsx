import React, { createContext, useContext, useState } from "react";
import type { Broker } from "@/types/trading";

interface BrokerContextType {
  selectedBroker: Broker | null;
  setSelectedBroker: (broker: Broker) => void;
  clearSelectedBroker: () => void;
}

const BrokerContext = createContext<BrokerContextType | undefined>(undefined);

export function BrokerProvider({ children }: { children: React.ReactNode }) {
  const [selectedBroker, setSelectedBrokerState] = useState<Broker | null>(
    null
  );

  const setSelectedBroker = (broker: Broker) => {
    setSelectedBrokerState(broker);
  };

  const clearSelectedBroker = () => {
    setSelectedBrokerState(null);
  };

  return (
    <BrokerContext.Provider
      value={{ selectedBroker, setSelectedBroker, clearSelectedBroker }}
    >
      {children}
    </BrokerContext.Provider>
  );
}

export function useBrokerContext() {
  const context = useContext(BrokerContext);
  if (context === undefined) {
    throw new Error("useBrokerContext must be used within a BrokerProvider");
  }
  return context;
}
