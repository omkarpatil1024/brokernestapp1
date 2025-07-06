import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { BrokerProvider } from "@/contexts/BrokerContext";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProtectedRoute, PublicRoute } from "@/components/AuthRoutes";
import BrokerSelection from "@/pages/login/BrokerSelection";
import LoginPage from "@/pages/login/LoginPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import Orders from "@/pages/orders/Orders";
import Positions from "@/pages/positions/Positions";
import NotFound from "@/pages/not-found";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<BrokerSelection />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <DashboardLayout>
              <Orders />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/positions"
          element={
            <DashboardLayout>
              <Positions />
            </DashboardLayout>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrokerProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <AppRoutes />
            </TooltipProvider>
          </BrowserRouter>
        </BrokerProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
