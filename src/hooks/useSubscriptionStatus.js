import { useState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { paymentAPI } from "@/services/paymentService";

export const useSubscriptionStatus = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuthStore();

  useEffect(() => {
    const checkSubscription = async () => {
      if (!token || !user?.id) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await paymentAPI.getUserSubscription(user.id, token);
        setSubscription(response.data);
      } catch (error) {
        console.error("Error checking subscription:", error);
        setError(
          error.response?.data?.message || "Failed to fetch subscription"
        );
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [token, user]);

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
    error,
    isActive,
    isTrialing,
    isExpired,
    isTrialExpired,
    canAccess,
    refetch: async () => {
      if (!token || !user?.id) return;
      try {
        const response = await paymentAPI.getUserSubscription(user.id, token);
        setSubscription(response.data);
      } catch (error) {
        console.error("Error refetching subscription:", error);
      }
    },
  };
};
