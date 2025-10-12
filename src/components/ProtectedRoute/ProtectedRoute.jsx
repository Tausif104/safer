"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

/**
 * ProtectedRoute Component
 * Only checks authentication - NOT subscription
 * Subscription errors are handled by error codes from API calls
 */
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    // Only check authentication
    if (!isAuthenticated || !token) {
      router.push("/login-premises");
    }
  }, [isAuthenticated, token, router]);

  // If not authenticated, don't render
  if (!isAuthenticated || !token) {
    return null;
  }

  // Always render children - let API calls determine access via error codes
  return <>{children}</>;
};

export default ProtectedRoute;
