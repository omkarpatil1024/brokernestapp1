import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { MobileSidebar } from "./MobileSidebar";
import { DesktopSidebar } from "./DesktopSidebar";
import { TopBar } from "./TopBar";
import { OrderPad } from "@/components/order-pad";
import { OrderPadProvider, useOrderPad } from "@/contexts/OrderPadContext";
import { FabOrderModal } from "@/components/fab-order-modal";
import { FabOrderProvider, useFabOrder } from "@/contexts/FabOrderContext";
import { DraggableFAB } from "@/components/draggable-fab";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuthContext();
  const location = useLocation();
  const { isOrderPadOpen, selectedStock, defaultOrderType, closeOrderPad } =
    useOrderPad();
  const {
    isFabModalOpen,
    selectedStock: fabStock,
    orderType: fabOrderType,
    openFabModal,
    closeFabModal,
  } = useFabOrder();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        currentPath={location.pathname}
      />

      <DesktopSidebar currentPath={location.pathname} onLogout={handleLogout} />

      <div className="lg:pl-64">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <OrderPad
          isOpen={isOrderPadOpen}
          onClose={closeOrderPad}
          stock={selectedStock}
          defaultOrderType={defaultOrderType}
        />

        <FabOrderModal
          isOpen={isFabModalOpen}
          onClose={closeFabModal}
          orderType={fabOrderType}
          stock={fabStock}
        />

        <DraggableFAB
          onQuickBuy={() => openFabModal("BUY")}
          onQuickSell={() => openFabModal("SELL")}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <OrderPadProvider>
      <FabOrderProvider>
        <DashboardLayoutContent {...props} />
      </FabOrderProvider>
    </OrderPadProvider>
  );
}
