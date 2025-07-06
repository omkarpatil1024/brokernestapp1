import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, EyeOff, Eye } from "lucide-react";
import { useLogin } from "./useLogin";

export default function LoginPage() {
  const {
    isAuthenticated,
    selectedBroker,
    credentials,
    setCredentials,
    handleLogin,
    isLoading,
    handleBack,
    togglePassword,
    showPassword,
  } = useLogin();

  if (isAuthenticated || !selectedBroker) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="text-center flex items-center justify-center">
              <img
                src={selectedBroker.logo}
                alt={selectedBroker.name}
                className="w-16 h-16 rounded-full object-contain mb-3"
              />
            </div>
            <CardTitle className="text-center">
              Login to {selectedBroker.name}
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                User ID
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your user ID"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>

              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-2 flex-col">
            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={
                isLoading || !credentials.username || !credentials.password
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
            >
              Go back to Broker Selection
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
