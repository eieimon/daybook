import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://daybook-dev.webworkinprogress.com/api/v1/";

const AxiosApiClient = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Enable cookies for authentication
});

AxiosApiClient.interceptors.request.use(async (config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  return config;
});

AxiosApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Skip 401 handling for login requests to allow mutation error handling
      const isLoginRequest = error.config?.url?.includes("/auth/login");
      if (isLoginRequest) {
        return Promise.reject(error);
      }

      // Otherwise, handle as normal auth error - clear user data and redirect
      useAuthStore.getState().logout();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  },
);

export default AxiosApiClient;
