import axios from "axios";
import { API_BASE_URL } from "@/config/constant";

export const paymentAPI = {
  // Create checkout session for subscription
  createCheckoutSession: async (pricingPlanId, token) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/payments/checkout-sessions`,
      {
        pricingPlanId,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/pricing`,
        trialDays: 7,
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

  // Create portal session for subscription management
  createPortalSession: async (customerId, token) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/payments/portal-sessions`,
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

  // Get user's active subscription
  getUserSubscription: async (userId, token) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/payments/users/${userId}/subscription`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  // Get checkout session details
  getCheckoutSession: async (sessionId) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/payments/checkout-sessions/${sessionId}`
    );
    return response.data;
  },

  // Get all pricing plans
  getPricingPlans: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/pricing-plans`);
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId, immediately = false, token) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/v1/payments/subscriptions/${subscriptionId}?immediately=${immediately}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  // Update subscription
  updateSubscription: async (subscriptionId, updateData, token) => {
    const response = await axios.patch(
      `${API_BASE_URL}/api/v1/payments/subscriptions/${subscriptionId}`,
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
};
