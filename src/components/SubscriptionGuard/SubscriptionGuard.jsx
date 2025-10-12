"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FaExclamationTriangle, FaCreditCard, FaClock } from "react-icons/fa";
import useAuthStore from "@/store/useAuthStore";
import { subscriptionAPI } from "@/services/paymentService";

const SubscriptionGuard = ({ children, allowTrial = false }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkSubscription = async () => {
      if (!token || !user?.id) {
        setError("Please log in to access this feature");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await subscriptionAPI.getUserSubscription(
          user.id,
          token
        );
        const subscription = response.data;

        if (!subscription) {
          setSubscriptionStatus("NO_SUBSCRIPTION");
        } else if (subscription.status === "TRIALING") {
          const trialEnd = new Date(subscription.trialEnd);
          const now = new Date();

          if (trialEnd < now) {
            setSubscriptionStatus("TRIAL_EXPIRED");
          } else {
            setSubscriptionStatus("TRIALING");
          }
        } else if (subscription.isActive) {
          const periodEnd = new Date(subscription.currentPeriodEnd);
          const now = new Date();

          if (periodEnd < now) {
            setSubscriptionStatus("SUBSCRIPTION_EXPIRED");
          } else {
            setSubscriptionStatus("ACTIVE");
          }
        } else {
          setSubscriptionStatus("INACTIVE");
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
        if (error.response?.data?.code) {
          setSubscriptionStatus(error.response.data.code);
        } else {
          setError("Failed to verify subscription status");
        }
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [token, user]);

  const handleUpgrade = () => {
    router.push("/pricing");
  };

  const handleManageSubscription = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Verifying subscription status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <FaExclamationTriangle className="mx-auto text-4xl text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/login")} className="primary-btn">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // Allow access for active subscriptions
  if (subscriptionStatus === "ACTIVE") {
    return <>{children}</>;
  }

  // Allow access for trial subscriptions if allowTrial is true
  if (allowTrial && subscriptionStatus === "TRIALING") {
    return <>{children}</>;
  }

  // Show subscription required message
  if (
    subscriptionStatus === "NO_SUBSCRIPTION" ||
    subscriptionStatus === "NO_SUBSCRIPTION_OR_TRIAL"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <FaCreditCard className="mx-auto text-4xl text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Required
          </h1>
          <p className="text-gray-600 mb-6">
            You need an active subscription to access this feature. Choose a
            plan that works for your pharmacy.
          </p>
          <div className="space-y-3">
            <Button onClick={handleUpgrade} className="primary-btn w-full">
              View Pricing Plans
            </Button>
            <Button
              onClick={handleManageSubscription}
              variant="outline"
              className="w-full"
            >
              Manage Subscription
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show trial expired message
  if (subscriptionStatus === "TRIAL_EXPIRED") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <FaClock className="mx-auto text-4xl text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Trial Expired
          </h1>
          <p className="text-gray-600 mb-6">
            Your free trial has ended. Subscribe to a plan to continue using
            SafeRx and access all features.
          </p>
          <div className="space-y-3">
            <Button onClick={handleUpgrade} className="primary-btn w-full">
              Subscribe Now
            </Button>
            <Button
              onClick={handleManageSubscription}
              variant="outline"
              className="w-full"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show subscription expired message
  if (
    subscriptionStatus === "SUBSCRIPTION_EXPIRED" ||
    subscriptionStatus === "SUBSCRIPTION_CANCELED_EXPIRED"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <FaExclamationTriangle className="mx-auto text-4xl text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Expired
          </h1>
          <p className="text-gray-600 mb-6">
            Your subscription has expired. Renew your subscription to continue
            using SafeRx and access all features.
          </p>
          <div className="space-y-3">
            <Button onClick={handleUpgrade} className="primary-btn w-full">
              Renew Subscription
            </Button>
            <Button
              onClick={handleManageSubscription}
              variant="outline"
              className="w-full"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show inactive subscription message
  if (subscriptionStatus === "INACTIVE") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <FaExclamationTriangle className="mx-auto text-4xl text-gray-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Inactive
          </h1>
          <p className="text-gray-600 mb-6">
            Your subscription is currently inactive. Please contact support or
            manage your subscription to restore access.
          </p>
          <div className="space-y-3">
            <Button
              onClick={handleManageSubscription}
              className="primary-btn w-full"
            >
              Manage Subscription
            </Button>
            <Button
              onClick={handleUpgrade}
              variant="outline"
              className="w-full"
            >
              View Pricing Plans
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for unknown status
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
        <FaExclamationTriangle className="mx-auto text-4xl text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Access Restricted
        </h1>
        <p className="text-gray-600 mb-6">
          Unable to verify your subscription status. Please contact support for
          assistance.
        </p>
        <div className="space-y-3">
          <Button
            onClick={handleManageSubscription}
            className="primary-btn w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionGuard;
