import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import {
  AUTH_ERROR_CODES,
  SUBSCRIPTION_ERROR_CODES,
  NOT_FOUND_ERROR_CODES,
  isSubscriptionError,
  isAuthError,
  getSubscriptionStatusFromErrorCode,
} from "@/config/error-codes";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to automatically add token
api.interceptors.request.use(
  (config) => {
    console.log("config =======>", config);
    // Try to get token from localStorage (zustand persist storage)
    if (typeof window !== "undefined") {
      try {
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const { state } = JSON.parse(authStorage);
          const token = state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error("Error getting token from storage:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorCode = data?.errorCode;

      // Handle subscription-related errors
      if (isSubscriptionError(errorCode)) {
        const subscriptionStatus =
          getSubscriptionStatusFromErrorCode(errorCode);

        // Store subscription error info for ProtectedRoute to handle
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            "subscription_error",
            JSON.stringify({
              errorCode,
              status: subscriptionStatus,
              message: data?.message,
              expiredAt: data?.expiredAt,
              timestamp: Date.now(),
            })
          );
        }

        // Don't auto-redirect - let ProtectedRoute component handle it
        return Promise.reject(error);
      }

      // Handle authentication errors
      if (isAuthError(errorCode)) {
        handleUnauthorized(data);
        return Promise.reject(error);
      }

      // Handle specific error codes
      switch (errorCode) {
        case NOT_FOUND_ERROR_CODES.USER_NOT_FOUND:
          handleUserNotFound(data);
          break;

        default:
          // Log unhandled errors
          if (errorCode) {
            console.error(`Unhandled error code: ${errorCode}`, data);
          }
          break;
      }
    }

    return Promise.reject(error);
  }
);

const handleNoSubscription = (data) => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    if (currentPath !== "/pricing") {
      localStorage.setItem(
        "subscription_redirect_message",
        data.message || "Please subscribe to access this feature"
      );
      window.location.href = "/pricing";
    }
  }
};

const handleTrialExpired = (data) => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    if (currentPath !== "/pricing") {
      localStorage.setItem(
        "subscription_redirect_message",
        data.message || "Your trial has expired"
      );
      localStorage.setItem("subscription_redirect_type", "trial_expired");
      window.location.href = "/pricing";
    }
  }
};

const handleSubscriptionExpired = (data) => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    if (currentPath !== "/pricing") {
      localStorage.setItem(
        "subscription_redirect_message",
        data.message || "Your subscription has expired"
      );
      localStorage.setItem(
        "subscription_redirect_type",
        "subscription_expired"
      );
      window.location.href = "/pricing";
    }
  }
};

const handleUnauthorized = (data) => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    const publicPaths = [
      "/login-premises",
      "/login-technician",
      "/login-admin",
      "/signup-premises",
      "/signup-technician",
    ];

    if (!publicPaths.some((path) => currentPath.startsWith(path))) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.setItem(
        "auth_redirect_message",
        data.message || "Please log in to continue"
      );
      window.location.href = "/login-premises";
    }
  }
};

const handleInternalError = (data) => {
  if (typeof window !== "undefined") {
    console.error("Server error:", data.message);
  }
};

const handleTrialNotAllowed = (data) => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    if (currentPath !== "/pricing") {
      localStorage.setItem(
        "subscription_redirect_message",
        data.message || "This feature requires an active paid subscription"
      );
      localStorage.setItem("subscription_redirect_type", "trial_not_allowed");
      window.location.href = "/pricing";
    }
  }
};

const handleUserNotFound = (data) => {
  if (typeof window !== "undefined") {
    console.error("User not found:", data.message);
    localStorage.clear();
    window.location.href = "/login-premises";
  }
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
