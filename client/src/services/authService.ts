import { apiRequest } from "@/lib/queryClient";
import type { LoginRequest, User } from "@shared/schema";

export const authService = {
  login: async (credentials: LoginRequest): Promise<{ user: User; message: string }> => {
    const response = await apiRequest("POST", "/api/auth/login", credentials);
    return response.json();
  },
};