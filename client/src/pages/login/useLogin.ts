import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useAuthContext } from "@/contexts/AuthContext";
import { useBrokerContext } from "@/contexts/BrokerContext";
import { useAppDispatch } from "@/store/hooks";
import { login as reduxLogin } from "@/store/authSlice";
import type { LoginRequest } from "@shared/schema";
import { toast } from "sonner";
import { Broker } from "@/types/trading";

export function useLogin() {


  const brokers: Broker[] = [
    {
      id: "zerodha",
      name: "Zerodha",
      description: "India's largest stock broker",
      logo: "https://images.seeklogo.com/logo-png/48/1/zerodha-kite-logo-png_seeklogo-487028.png",
    },
    {
      id: "upstox",
      name: "Upstox",
      description: "Trade equities, F&O, and mutual funds with zero brokerage",
      logo: "https://cdn.prod.website-files.com/654b1d09f45e7fa434ed2511/65c1bf2944f160fe0d6530dc_607f20925f099e2e42a080ce_Upstock_Logo.png",
    },
    {
      id: "groww",
      name: "Groww",
      description: "Direct mutual funds and stock investing",
      logo: "https://play-lh.googleusercontent.com/LHjOai6kf1IsstKNWO9jbMxD-ix_FVYaJSLodKCqYQdoFVzQBuV9z5txxzcTagQcyX8",
    },
    {
      id: "angelone",
      name: "Angel One",
      description: "Smart investing and trading platform",
      logo: "https://play-lh.googleusercontent.com/Ic8lUYwMCgTePpo-Gbg0VwE_0srDj1xD386BvQHO_mOwsfMjX8lFBLl0Def28pO_Mvk",
    },
    {
      id: "icicidirect",
      name: "ICICI Direct",
      description: "Full-service stockbroker from ICICI Bank",
      logo: "https://play-lh.googleusercontent.com/RqpvFiLwp9Vz8dY3QZplf7IZ0ZzCCjH9CVXlO61FIrCUQQCDfSrvPufjDw6sfbjTKg",
    },
    {
      id: "kotaksecurities",
      name: "Kotak Securities",
      description: "Stock trading with Kotak Mahindra Bank",
      logo: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/22/39/f3/2239f3e9-97a8-1c35-e132-ad4ccb8ed3e6/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1024x1024.jpg",
    },
  ];

  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { selectedBroker,setSelectedBroker } = useBrokerContext();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      toast.success("Login successful");
      login(data.user);
      dispatch(reduxLogin(data.user));
    },
    onError: (error) => {
      toast.error("Login failed: " + error.message);
    },
  });

  const handleLogin = async () => {
    if (!selectedBroker) return;

    const loginData: LoginRequest = {
      username: credentials.username,
      password: credentials.password,
      broker: selectedBroker.id,
    };

    try {
      await loginMutation.mutateAsync(loginData);
      setCredentials({ username: "", password: "" });
    } catch (error) {}
  };

  const handleBack = () => {
    navigate("/");
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

    const handleBrokerSelect = (broker: Broker) => {
      setSelectedBroker(broker);
      navigate("/login");
    };

  return {
    isAuthenticated,
    selectedBroker,
    credentials,
    setCredentials,
    handleLogin,
    handleBack,
    isLoading: loginMutation.isPending,
    togglePassword,
    showPassword,

    // broker selection
    handleBrokerSelect,
    brokers
  };
}
