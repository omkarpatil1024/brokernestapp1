import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { MobileSidebar } from "./MobileSidebar";
import { DesktopSidebar } from "./DesktopSidebar";
import { TopBar } from "./TopBar";
import { DraggableFAB } from "@/components/draggable-fab";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuthContext();
  const location = useLocation();

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

    {/* <OrderPad
        isOpen={orderPadOpen}
        onClose={() => setOrderPadOpen(false)}
        stock={selectedStock}
        defaultOrderType={defaultOrderType}
      /> */}

<DraggableFAB onQuickBuy={() => {}} onQuickSell={() => {}} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
