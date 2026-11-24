import { apiServices } from "../networkService";
import { API_ENDPOINT } from "@/constants/endpoints";

interface LoginCredentials extends Record<string, unknown> {
  email: string;
  password: string;
}

interface LoginResponse extends Record<string, unknown> {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
}

export interface LogoutResponse {
  message: string;
}

/**
 * Authenticates a user with email and password
 *
 * @param credentials - The user's login credentials
 * @returns Promise<LoginResponse> - The user data (no token needed)
 */
export const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  // Then make the login request
  const response = await apiServices.post<LoginResponse>(
    API_ENDPOINT.LOGIN,
    credentials,
  );
  return response.data;
};

/**
 * Logs out the current user and clears the session cookie
 *
 * @returns Promise<LogoutResponse> - Success message from the server
 */
export const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await apiServices.post<LogoutResponse>(API_ENDPOINT.LOGOUT);
  // Note: The session cookie is automatically cleared by the server
  return response.data;
};
