"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

/**
 * ProtectedRoute Component
 * Only checks authentication - NOT subscription
 * Subscription errors are handled by error codes from API calls
 * Waits for store hydration to prevent false redirects on page reload
 */
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, token, _hasHydrated } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for Zustand store to hydrate from localStorage
    if (_hasHydrated) {
      setIsReady(true);

      // Only check authentication after hydration
      if (!isAuthenticated || !token) {
        router.push("/login-premises");
      }
    }
  }, [isAuthenticated, token, router, _hasHydrated]);

  // Show loading state until hydration is complete
  if (!_hasHydrated || !isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // If not authenticated, don't render
  if (!isAuthenticated || !token) {
    return null;
  }

  // Always render children - let API calls determine access via error codes
  return <>{children}</>;
};

export default ProtectedRoute;
