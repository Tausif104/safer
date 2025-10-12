import { useState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { getSubscriptionStatusFromErrorCode } from "@/config/error-codes";

/**
 * Hook to check subscription status
 * NO API CALLS - Uses data from auth store and error codes from sessionStorage
 */
export const useSubscriptionStatus = () => {
  const { subscription: authSubscription, user } = useAuthStore();
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for subscription errors from API calls
  useEffect(() => {
    const checkSubscriptionError = () => {
      if (typeof window !== "undefined") {
        const errorData = sessionStorage.getItem("subscription_error");
        if (errorData) {
          try {
            const error = JSON.parse(errorData);
            // Only use errors from last 5 seconds to avoid stale data
            if (Date.now() - error.timestamp < 5000) {
              setSubscriptionError(error);
            } else {
              sessionStorage.removeItem("subscription_error");
              setSubscriptionError(null);
            }
          } catch (e) {
            console.error("Error parsing subscription error:", e);
          }
        } else {
          setSubscriptionError(null);
        }
      }
    };

    // Check immediately and set up interval
    checkSubscriptionError();
    const interval = setInterval(checkSubscriptionError, 1000);
    return () => clearInterval(interval);
  }, []);

  // Use subscription from auth store (received during login)
  const subscription = authSubscription;

  // If there's a subscription error from API, use that to determine status
  if (subscriptionError) {
    const errorStatus = subscriptionError.status;
    return {
      subscription: subscriptionError.expiredAt
        ? {
            trialEnd: subscriptionError.expiredAt,
            currentPeriodEnd: subscriptionError.expiredAt,
          }
        : null,
      loading: false,
      error: subscriptionError.message,
      isActive: false,
      isTrialing: errorStatus === "TRIAL_EXPIRED",
      isExpired: errorStatus === "SUBSCRIPTION_EXPIRED",
      isTrialExpired: errorStatus === "TRIAL_EXPIRED",
      canAccess: false,
    };
  }

  // Otherwise, use subscription from auth store
  const isActive =
    subscription?.isActive && subscription?.status !== "CANCELED";
  const isTrialing = subscription?.status === "TRIALING";
  const isExpired =
    subscription?.currentPeriodEnd &&
    new Date(subscription.currentPeriodEnd) < new Date();
  const isTrialExpired =
    subscription?.trialEnd && new Date(subscription.trialEnd) < new Date();

  const canAccess = isActive || (isTrialing && !isTrialExpired);

  return {
    subscription,
    loading,
    error: null,
    isActive,
    isTrialing,
    isExpired,
    isTrialExpired,
    canAccess,
  };
};
