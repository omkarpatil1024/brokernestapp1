import React from "react";
import { TrendingUp } from "lucide-react";
import { NavigationLinks } from "./NavigationLinks";
import { UserInfo } from "./UserInfo";
import { useBrokerContext } from "@/contexts/BrokerContext";

interface DesktopSidebarProps {
  currentPath: string;
  onLogout: () => void;
}

export function DesktopSidebar({ currentPath, onLogout }: DesktopSidebarProps) {
  const { selectedBroker } = useBrokerContext();
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
        <div className="flex items-center h-16 flex-shrink-0 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              TradeHub Pro
            </span>
          </div>
        </div>

        <NavigationLinks currentPath={currentPath} />
        <UserInfo onLogout={onLogout} />
      </div>
    </div>
  );
}
