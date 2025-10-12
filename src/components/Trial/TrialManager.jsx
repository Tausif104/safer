"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FaClock, FaCheckCircle, FaTimesCircle, FaGift } from "react-icons/fa";
import useAuthStore from "@/store/useAuthStore";
import { subscriptionAPI } from "@/services/paymentService";

const TrialManager = () => {
  const [trialStatus, setTrialStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { token, user } = useAuthStore();

  useEffect(() => {
    const fetchTrialStatus = async () => {
      if (!user?.id || !token) return;

      try {
        setLoading(true);
        const response = await subscriptionAPI.getTrialStatus(user.id, token);
        setTrialStatus(response.data);
      } catch (error) {
        console.error("Error fetching trial status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrialStatus();
  }, [user, token]);

  const handleStartTrial = async (pricingPlanId) => {
    if (!user?.id || !token) return;

    try {
      setActionLoading(true);
      const response = await subscriptionAPI.startTrial(pricingPlanId, token);

      const statusResponse = await subscriptionAPI.getTrialStatus(
        user.id,
        token
      );
      setTrialStatus(statusResponse.data);

      alert(
        "Trial started successfully! You have 7 days to explore all features."
      );
    } catch (error) {
      console.error("Error starting trial:", error);
      alert("Failed to start trial. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysRemaining = (trialEnd) => {
    if (!trialEnd) return 0;
    const now = new Date();
    const end = new Date(trialEnd);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading trial information...</p>
        </div>
      </div>
    );
  }

  if (!trialStatus) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center">
          <FaGift className="text-blue-500 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Start Your Free Trial
          </h3>
          <p className="text-gray-600 mb-4">
            Get 7 days of full access to all features. No credit card required.
          </p>
          <Button
            onClick={() => (window.location.href = "/pricing")}
            className="primary-btn"
          >
            Choose a Plan to Start Trial
          </Button>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(trialStatus.trialEnd);
  const isTrialActive = trialStatus.isTrialActive;
  const trialExpired = trialStatus.trialExpired;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Trial Status</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isTrialActive
                ? "text-blue-600 bg-blue-100"
                : trialExpired
                ? "text-red-600 bg-red-100"
                : "text-gray-600 bg-gray-100"
            }`}
          >
            {isTrialActive
              ? "Active Trial"
              : trialExpired
              ? "Trial Expired"
              : "No Trial"}
          </span>
        </div>
      </div>

      <div className="p-6">
        {isTrialActive && (
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <FaClock className="text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-900">Trial Active</h3>
              </div>
              <p className="text-blue-800 text-sm">
                You have <strong>{daysRemaining} days</strong> remaining in your
                free trial.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Trial Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">
                      {trialStatus.pricingPlan?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Started:</span>
                    <span className="font-medium">
                      {formatDate(trialStatus.trialStart)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires:</span>
                    <span className="font-medium">
                      {formatDate(trialStatus.trialEnd)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Features Available
                </h4>
                <div className="space-y-1">
                  {trialStatus.pricingPlan?.features
                    ?.slice(0, 3)
                    .map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  {trialStatus.pricingPlan?.features?.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{trialStatus.pricingPlan.features.length - 3} more
                      features
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => (window.location.href = "/pricing")}
                className="primary-btn"
              >
                Subscribe to Continue
              </Button>

              <Button
                onClick={() => (window.location.href = "/dashboard")}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Continue Using App
              </Button>
            </div>
          </div>
        )}

        {trialExpired && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <FaTimesCircle className="text-red-600 mr-2" />
                <h3 className="font-semibold text-red-900">Trial Expired</h3>
              </div>
              <p className="text-red-800 text-sm">
                Your free trial has ended. Subscribe to continue using all
                features.
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={() => (window.location.href = "/pricing")}
                className="primary-btn"
              >
                Choose a Subscription Plan
              </Button>
            </div>
          </div>
        )}

        {!isTrialActive && !trialExpired && (
          <div className="text-center">
            <FaGift className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Start Your Free Trial
            </h3>
            <p className="text-gray-600 mb-4">
              Get 7 days of full access to all features. No credit card
              required.
            </p>
            <Button
              onClick={() => (window.location.href = "/pricing")}
              className="primary-btn"
            >
              Choose a Plan to Start Trial
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrialManager;
