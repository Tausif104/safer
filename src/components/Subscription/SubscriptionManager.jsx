"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  FaCreditCard,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
} from "react-icons/fa";
import useAuthStore from "@/store/useAuthStore";
import { subscriptionAPI } from "@/services/paymentService";

const SubscriptionManager = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { token, user } = useAuthStore();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user?.id || !token) return;

      try {
        setLoading(true);
        const response = await subscriptionAPI.getUserSubscription(
          user.id,
          token
        );
        setSubscription(response.data);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user, token]);

  const handleManageSubscription = async () => {
    if (!subscription?.stripeCustomerId || !token) return;

    try {
      setActionLoading(true);
      const response = await subscriptionAPI.createPortalSession(
        subscription.stripeCustomerId,
        token
      );

      // Redirect to Stripe Customer Portal
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error creating portal session:", error);
      alert("Failed to open subscription management. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription?.id || !token) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription? It will remain active until the end of your current billing period."
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);
      await subscriptionAPI.cancelSubscription(subscription.id, false, token);

      const response = await subscriptionAPI.getUserSubscription(
        user.id,
        token
      );
      setSubscription(response.data);

      alert(
        "Subscription canceled successfully. It will remain active until the end of your billing period."
      );
    } catch (error) {
      console.error("Error canceling subscription:", error);
      alert("Failed to cancel subscription. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: "text-green-600 bg-green-100",
      TRIALING: "text-blue-600 bg-blue-100",
      PAST_DUE: "text-yellow-600 bg-yellow-100",
      CANCELED: "text-red-600 bg-red-100",
      INACTIVE: "text-gray-600 bg-gray-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (amount) => {
    return `$${(amount / 100).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center">
          <FaTimesCircle className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Active Subscription
          </h3>
          <p className="text-gray-600 mb-4">
            You don't have an active subscription. Choose a plan to get started.
          </p>
          <Button
            onClick={() => (window.location.href = "/pricing")}
            className="primary-btn"
          >
            View Pricing Plans
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Subscription Details
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              subscription.status
            )}`}
          >
            {subscription.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Plan Details
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Plan:</span>
                <span className="font-medium">
                  {subscription.pricingPlan?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Price:</span>
                <span className="font-medium">
                  ${subscription.pricingPlan?.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Billing:</span>
                <span className="font-medium">
                  {subscription.pricingPlan?.type === "MONTHLY"
                    ? "Monthly"
                    : "Yearly"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Billing Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Current period starts:</span>
                <span className="font-medium">
                  {formatDate(subscription.currentPeriodStart)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Current period ends:</span>
                <span className="font-medium">
                  {formatDate(subscription.currentPeriodEnd)}
                </span>
              </div>
              {subscription.trialEnd && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Trial ends:</span>
                  <span className="font-medium">
                    {formatDate(subscription.trialEnd)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {subscription.pricingPlan?.features && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Included Features
            </h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {subscription.pricingPlan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-700"
                >
                  <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleManageSubscription}
            disabled={actionLoading}
            className="primary-btn flex items-center gap-2"
          >
            {actionLoading ? <Spinner size="sm" /> : <FaCreditCard />}
            Manage Billing
          </Button>

          <Button
            onClick={() => (window.location.href = "/payment-history")}
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
          >
            <FaHistory />
            Payment History
          </Button>

          {subscription.status === "ACTIVE" && !subscription.canceledAt && (
            <Button
              onClick={handleCancelSubscription}
              disabled={actionLoading}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Cancel Subscription
            </Button>
          )}

          {subscription.canceledAt && (
            <div className="flex items-center text-sm text-yellow-600 bg-yellow-50 px-3 py-2 rounded">
              <FaCalendarAlt className="mr-2" />
              Cancels on {formatDate(subscription.currentPeriodEnd)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;
