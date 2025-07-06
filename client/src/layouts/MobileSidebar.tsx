import React from "react";
import { LogOut, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationLinks } from "./NavigationLinks";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  currentPath: string;
}

export function MobileSidebar({
  isOpen,
  onClose,
  onLogout,
  currentPath,
}: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
        <div className="flex h-16 flex-shrink-0 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-gray-900">TradeHub</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <NavigationLinks currentPath={currentPath} onLinkClick={onClose} />
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
