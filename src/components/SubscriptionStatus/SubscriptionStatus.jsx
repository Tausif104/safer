"use client";
import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import Link from "next/link";

const SubscriptionStatus = ({ showDetails = false }) => {
  const {
    subscription,
    loading,
    canAccess,
    isTrialing,
    isExpired,
    isTrialExpired,
  } = useSubscriptionStatus();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="animate-pulse flex items-center space-x-3">
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <FaTimesCircle className="text-red-500 text-xl" />
          <div className="flex-1">
            <h3 className="text-red-800 font-semibold">
              No Active Subscription
            </h3>
            <p className="text-red-600 text-sm">
              Subscribe to access all features
            </p>
          </div>
          <Link
            href="/pricing"
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
          >
            Subscribe
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (isTrialExpired)
      return <FaExclamationTriangle className="text-red-500 text-xl" />;
    if (isExpired)
      return <FaExclamationTriangle className="text-red-500 text-xl" />;
    if (isTrialing) return <FaClock className="text-yellow-500 text-xl" />;
    if (canAccess) return <FaCheckCircle className="text-green-500 text-xl" />;
    return <FaTimesCircle className="text-red-500 text-xl" />;
  };

  const getStatusColor = () => {
    if (isTrialExpired || isExpired) return "bg-red-50 border-red-200";
    if (isTrialing) return "bg-yellow-50 border-yellow-200";
    if (canAccess) return "bg-green-50 border-green-200";
    return "bg-red-50 border-red-200";
  };

  const getStatusText = () => {
    if (isTrialExpired) return "Trial Expired";
    if (isExpired) return "Subscription Expired";
    if (isTrialing) return "Free Trial Active";
    if (canAccess) return "Subscription Active";
    return "Subscription Inactive";
  };

  const getStatusDescription = () => {
    if (isTrialExpired) return "Your trial has ended. Subscribe to continue.";
    if (isExpired) return "Your subscription has expired. Renew to continue.";
    if (isTrialing) {
      const daysRemaining = Math.ceil(
        (new Date(subscription.trialEnd).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return `${daysRemaining} days remaining in trial`;
    }
    if (canAccess) {
      const renewalDate = new Date(
        subscription.currentPeriodEnd
      ).toLocaleDateString();
      return `Renews on ${renewalDate}`;
    }
    return "Please contact support";
  };

  const getActionButton = () => {
    if (isTrialExpired || isExpired) {
      return (
        <Link
          href="/pricing"
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
        >
          Subscribe
        </Link>
      );
    }
    if (isTrialing) {
      return (
        <Link
          href="/dashboard"
          className="bg-yellow-600 text-white px-4 py-2 rounded-md text-sm hover:bg-yellow-700"
        >
          Manage
        </Link>
      );
    }
    if (canAccess) {
      return (
        <Link
          href="/dashboard"
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
        >
          Manage
        </Link>
      );
    }
    return (
      <Link
        href="/pricing"
        className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
      >
        Subscribe
      </Link>
    );
  };

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{getStatusText()}</h3>
          <p className="text-sm text-gray-600">{getStatusDescription()}</p>
          {showDetails && subscription.pricingPlan && (
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-medium">
                {subscription.pricingPlan.name}
              </span>
              <span className="mx-2">•</span>
              <span>
                ${subscription.pricingPlan.price}{" "}
                {subscription.pricingPlan.type === "MONTHLY"
                  ? "per month"
                  : "per year"}
              </span>
            </div>
          )}
        </div>
        {getActionButton()}
      </div>
    </div>
  );
};

export default SubscriptionStatus;
