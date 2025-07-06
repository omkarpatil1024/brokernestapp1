import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";

interface UserInfoProps {
  onLogout: () => void;
}

export function UserInfo({ onLogout }: UserInfoProps) {
  const { user } = useAuthContext();

  return (
    <div className="p-4 border-t">
      <div className="mb-4">
        <div className="text-sm text-gray-500">Logged in as</div>
        <div className="font-medium">{user?.username}</div>
        <div className="text-sm text-gray-500 capitalize">{user?.broker}</div>
      </div>
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
