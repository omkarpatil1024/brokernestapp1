import React from "react";
import { Link } from "react-router-dom";
import { Wallet, List, BarChart3 } from "lucide-react";

interface NavigationLinksProps {
  currentPath: string;
  onLinkClick?: () => void;
}

export function NavigationLinks({
  currentPath,
  onLinkClick,
}: NavigationLinksProps) {
  const navigation = [
    {
      name: "Holdings",
      href: "/dashboard",
      icon: Wallet,
      current: currentPath === "/dashboard",
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: List,
      current: currentPath === "/dashboard/orders",
    },
    {
      name: "Positions",
      href: "/dashboard/positions",
      icon: BarChart3,
      current: currentPath === "/dashboard/positions",
    },
  ];

  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            item.current
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
          onClick={onLinkClick}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
