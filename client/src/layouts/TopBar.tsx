import React from "react";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

export function TopBar({ onMenuClick, onLogout }: TopBarProps) {
  return (
    <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-4">
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
