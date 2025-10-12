import api from "@/lib/api-interceptor";

export const subscriptionAPI = {
  createCheckoutSession: async (pricingPlanId, token, isUpgrade = false) => {
    const response = await api.post(
      "/api/v1/subscription/checkout-sessions",
      {
        pricingPlanId,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/pricing`,
        trialDays: isUpgrade ? 0 : 30, // No trial for upgrades
        isUpgrade,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  createPortalSession: async (customerId, token) => {
    const response = await api.post(
      "/api/v1/subscription/portal-sessions",
      {
        customerId,
        returnUrl: `${window.location.origin}/dashboard`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  getUserSubscription: async (userId, token) => {
    const response = await api.get(
      `/api/v1/subscription/users/${userId}/subscription`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  getCheckoutSession: async (sessionId) => {
    const response = await api.get(
      `/api/v1/subscription/checkout-sessions/${sessionId}`
    );
    return response.data;
  },

  createSubscriptionFromSession: async (sessionId, token) => {
    const response = await api.post(
      `/api/v1/subscription/checkout-sessions/${sessionId}/create-subscription`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  getUserPaymentHistory: async (token) => {
    const response = await api.get("/api/v1/subscription/users/payments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getPricingPlans: async () => {
    const response = await api.get("/api/v1/pricing-plans");
    return response.data;
  },

  cancelSubscription: async (subscriptionId, immediately = false, token) => {
    const response = await api.delete(
      `/api/v1/subscription/subscriptions/${subscriptionId}?immediately=${immediately}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  updateSubscription: async (subscriptionId, updateData, token) => {
    const response = await api.patch(
      `/api/v1/subscription/subscriptions/${subscriptionId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  checkEligibility: async (userId, token) => {
    const response = await api.get(
      `/api/v1/subscription/trial/eligibility/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  startTrial: async (pricingPlanId, token) => {
    const response = await api.post(
      "/api/v1/subscription/trial/start",
      {
        pricingPlanId,
        trialDays: 30,
        reason: "User initiated trial",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  getTrialStatus: async (userId, token) => {
    const response = await api.get(
      `/api/v1/subscription/trial/status/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  extendTrial: async (additionalDays, reason, token) => {
    const response = await api.post(
      "/api/v1/subscription/trial/extend",
      {
        additionalDays,
        reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  cancelTrial: async (userId, token) => {
    const response = await api.delete(`/api/v1/subscription/trial/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export const paymentAPI = subscriptionAPI;
