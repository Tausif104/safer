import axios from "axios";
import { API_BASE_URL } from "@/config/constant";

export const trialAPI = {
  // Check trial eligibility
  checkEligibility: async (userId, token) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/trials/eligibility/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  // Start a trial
  startTrial: async (pricingPlanId, token) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/trials/start`,
      {
        pricingPlanId,
        trialDays: 7,
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

  // Get trial status
  getTrialStatus: async (userId, token) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/trials/status/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  // Extend trial (admin only)
  extendTrial: async (additionalDays, reason, token) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/trials/extend`,
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

  // Cancel trial
  cancelTrial: async (userId, token) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/v1/trials/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
