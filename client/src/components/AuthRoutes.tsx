import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

interface AuthRoutesProps {
  children?: React.ReactNode;
  redirectTo?: string;
  isProtected?: boolean;
}

export function AuthRoutes({
  children,
  redirectTo = "/",
  isProtected = true,
}: AuthRoutesProps) {
  const { isAuthenticated } = useAuthContext();

  if (isProtected && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isProtected && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children || <Outlet />}</>;
}

export function ProtectedRoute() {
  return <AuthRoutes isProtected={true} />;
}

export function PublicRoute() {
  return <AuthRoutes isProtected={false} redirectTo="/dashboard" />;
}
