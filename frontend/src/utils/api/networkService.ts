import { AxiosError, isAxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import AxiosApiClient from "./axiosClient";
import { API_ENDPOINT } from "../../constants/endpoints";

interface RequestParams {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | Array<string | number | boolean>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

interface ErrorResponse {
  message?: string;
  error?: string;
  detail?: string;
  description?: string;
  errors?: Array<string | ErrorResponse>;
  [key: string]: unknown;
}

// HTTP Status Code Constants
const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
const ERROR_MESSAGES = {
  [HTTP_STATUS.UNAUTHORIZED]: "Unauthorized. Please check your credentials.",
  [HTTP_STATUS.FORBIDDEN]:
    "Access denied. You do not have permission to perform this action.",
  [HTTP_STATUS.NOT_FOUND]: "Resource not found.",
  [HTTP_STATUS.BAD_REQUEST]: "Bad request. Please check your input.",
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]:
    "Internal server error. Please try again later.",
  [HTTP_STATUS.TOO_MANY_REQUESTS]: "Too many requests. Please try again later.",
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]:
    "Validation error. Please check your input.",
  UNKNOWN: "An unexpected error occurred. Please try again.",
} as const;

// Authentication-specific error messages
const AUTH_ERROR_MESSAGES = {
  [API_ENDPOINT.FORGOT_PASSWORD]:
    "Email address not found. Please check your email and try again.",
  [API_ENDPOINT.RESET_PASSWORD]:
    "Reset token is invalid or has expired. Please request a new password reset link.",
  [API_ENDPOINT.LOGIN]: "Authentication failed. Please check your credentials.",
} as const;

/**
 * Extracts error message from error response data
 * Enhanced to handle multiple error message formats
 */
const extractErrorMessage = (errorData: unknown): string => {
  if (!errorData || typeof errorData !== "object") return "";

  const errorObj = errorData as ErrorResponse;

  // Try different possible error message fields in order of preference
  // 'error' field first since it often contains more detailed validation messages
  const possibleFields: (keyof ErrorResponse)[] = [
    "error",
    "message",
    "detail",
    "description",
  ];

  for (const field of possibleFields) {
    const value = errorObj[field];
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) return trimmed;
    }
  }

  // If no direct message field, try to extract from nested structures
  if (errorObj.errors && Array.isArray(errorObj.errors)) {
    const firstError = errorObj.errors[0];
    if (typeof firstError === "string") {
      return firstError.trim();
    }
    if (typeof firstError === "object" && firstError !== null) {
      return extractErrorMessage(firstError);
    }
  }

  return "";
};

/**
 * Gets authentication-specific error message based on endpoint
 */
const getAuthErrorMessage = (url: string): string => {
  for (const [endpoint, message] of Object.entries(AUTH_ERROR_MESSAGES)) {
    if (url.includes(endpoint)) {
      return message;
    }
  }
  return ERROR_MESSAGES[HTTP_STATUS.UNAUTHORIZED];
};

/**
 * Creates a standardized API response from Axios response
 */
const createApiResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => ({
  data: response.data,
  status: response.status,
  statusText: response.statusText,
});

/**
 * Handles generic errors that are not Axios errors
 */
const handleGenericError = (error: unknown): never => {
  console.error("Unexpected error:", error);
  throw new Error(ERROR_MESSAGES.UNKNOWN);
};

/**
 * Handles HTTP error responses with appropriate error messages
 */
const handleHttpError = (
  status: number,
  errorData: unknown,
  url?: string,
): never => {
  let message: string;

  // First try to extract any detailed error message from the server
  const serverErrorMessage = extractErrorMessage(errorData);

  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
      message = url
        ? getAuthErrorMessage(url)
        : ERROR_MESSAGES[HTTP_STATUS.UNAUTHORIZED];
      break;
    case HTTP_STATUS.FORBIDDEN:
      message = ERROR_MESSAGES[HTTP_STATUS.FORBIDDEN];
      break;
    case HTTP_STATUS.NOT_FOUND:
      message = url?.includes("/auth/")
        ? getAuthErrorMessage(url)
        : ERROR_MESSAGES[HTTP_STATUS.NOT_FOUND];
      break;
    case HTTP_STATUS.BAD_REQUEST:
      message = serverErrorMessage || ERROR_MESSAGES[HTTP_STATUS.BAD_REQUEST];
      throw {
        status: 400,
        data: errorData,
        message: message,
      };
    case HTTP_STATUS.CONFLICT:
      throw {
        status: 409,
        data: errorData,
        message: serverErrorMessage || "Conflict occurred",
      };
    case HTTP_STATUS.UNPROCESSABLE_ENTITY:
      message =
        serverErrorMessage || ERROR_MESSAGES[HTTP_STATUS.UNPROCESSABLE_ENTITY];
      break;
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      message = ERROR_MESSAGES[HTTP_STATUS.TOO_MANY_REQUESTS];
      break;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      // For 500 errors, prefer the server's detailed error message
      message =
        serverErrorMessage || ERROR_MESSAGES[HTTP_STATUS.INTERNAL_SERVER_ERROR];
      break;
    default:
      message = serverErrorMessage || ERROR_MESSAGES.UNKNOWN;
  }

  console.error(`HTTP ${status}: ${message}`);
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  throw error;
};

/**
 * Handles Axios errors and converts them to appropriate application errors
 */
const handleAxiosError = <T>(error: AxiosError<T>): never => {
  const { status, data } = error.response || {};
  const url = error.config?.url;

  if (status) {
    handleHttpError(status, data, url);
  }

  // Network or other Axios errors
  console.error("Network error:", error.message);
  throw new Error("Network error. Please check your connection and try again.");
};

/**
 * Wraps API calls with consistent error handling
 */
const withErrorHandling = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>,
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiCall();
    return createApiResponse(response);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      handleAxiosError(error);
    }
    return handleGenericError(error);
  }
};

/**
 * API service methods for making HTTP requests
 */
export const apiServices = {
  /**
   * Performs a GET request
   */
  async get<T>(
    endpoint: string,
    params: RequestParams = {},
    axiosConfig?: Omit<AxiosRequestConfig, "params">,
  ): Promise<ApiResponse<T>> {
    return withErrorHandling(() =>
      AxiosApiClient.get(endpoint, {
        withCredentials: true,
        ...axiosConfig,
        params,
      }),
    );
  },

  /**
   * Performs a POST request
   */
  async post<T, D = Record<string, unknown>>(
    endpoint: string,
    data?: D,
    params: RequestParams = {},
  ): Promise<ApiResponse<T>> {
    return withErrorHandling(() =>
      AxiosApiClient.post(endpoint, data, { params, withCredentials: true }),
    );
  },

  /**
   * Performs a PUT request
   */
  async put<T, D = Record<string, unknown>>(
    endpoint: string,
    data?: D,
    params: RequestParams = {},
  ): Promise<ApiResponse<T>> {
    return withErrorHandling(() =>
      AxiosApiClient.put(endpoint, data, { params, withCredentials: true }),
    );
  },

  /**
   * Performs a patch request
   */
  async patch<T, D = Record<string, unknown>>(
    endpoint: string,
    data?: D,
    params: RequestParams = {},
  ): Promise<ApiResponse<T>> {
    return withErrorHandling(() =>
      AxiosApiClient.patch(endpoint, data, { params, withCredentials: true }),
    );
  },

  /**
   * Performs a DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return withErrorHandling(() =>
      AxiosApiClient.delete(endpoint, { withCredentials: true }),
    );
  },
};
