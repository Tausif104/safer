"use client";
import React from "react";
import Link from "next/link";
import { FaLock, FaClock, FaExclamationTriangle } from "react-icons/fa";

/**
 * SubscriptionStatusScreen Component
 * Displays different screens based on subscription status
 * Can be used anywhere in the app to show subscription-related messages
 * Automatically determines which screen to show based on subscription data
 *
 * @param {object} subscription - Subscription data object (null if no subscription)
 * @param {boolean} isTrialExpired - Whether the trial has expired
 * @param {boolean} canAccess - Whether the user can access (from useSubscriptionStatus)
 * @param {string} primaryButtonText - Custom text for primary button (optional)
 * @param {string} primaryButtonHref - Custom href for primary button (optional)
 * @param {string} secondaryButtonText - Custom text for secondary button (optional)
 * @param {string} secondaryButtonHref - Custom href for secondary button (optional)
 */
const SubscriptionStatusScreen = ({
  subscription = null,
  isTrialExpired = false,
  canAccess = false,
  primaryButtonText = null,
  primaryButtonHref = null,
  secondaryButtonText = null,
  secondaryButtonHref = null,
}) => {
  // Determine which screen to show based on subscription data
  let screenType = "NO_SUBSCRIPTION";

  if (!subscription) {
    screenType = "NO_SUBSCRIPTION";
  } else if (isTrialExpired) {
    screenType = "TRIAL_EXPIRED";
  } else if (!canAccess) {
    screenType = "SUBSCRIPTION_EXPIRED";
  }

  // No Subscription Screen
  if (screenType === "NO_SUBSCRIPTION") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <FaLock className="text-4xl text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Subscription Required
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This feature is only available to subscribers. Upgrade your account
            to access all the powerful features of SafeRx.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">
              With a subscription, you get:
            </h3>
            <ul className="text-left text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Full access to incident reporting and tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Comprehensive pharmacy management tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Advanced reporting and analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Team collaboration features</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Priority customer support</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButtonHref || "/pricing"}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {primaryButtonText || "View Pricing Plans"}
            </Link>
            <Link
              href={secondaryButtonHref || "/dashboard"}
              className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {secondaryButtonText || "Back to Dashboard"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Trial Expired Screen
  if (screenType === "TRIAL_EXPIRED") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaClock className="text-4xl text-yellow-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Free Trial Expired
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your free trial has ended. Subscribe now to continue using SafeRx
            and keep your pharmacy operations running smoothly.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-900 font-medium">
              Don't lose access to your data and workflows!
            </p>
            <p className="text-yellow-800 text-sm mt-2">
              Subscribe today and get uninterrupted access to all features.
            </p>
            {subscription?.trialEnd && (
              <p className="text-yellow-700 text-xs mt-2">
                Trial ended on:{" "}
                {new Date(subscription.trialEnd).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButtonHref || "/pricing?upgrade=true"}
              className="px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
            >
              {primaryButtonText || "Upgrade Now"}
            </Link>
            <Link
              href={secondaryButtonHref || "/dashboard"}
              className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {secondaryButtonText || "Back to Dashboard"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Subscription Expired or Inactive Screen
  if (screenType === "SUBSCRIPTION_EXPIRED") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-4xl text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Subscription Expired
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your subscription has expired. Renew now to regain access to all
            SafeRx features.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <p className="text-red-900 font-medium">
              Your account is currently inactive
            </p>
            <p className="text-red-800 text-sm mt-2">
              Renew your subscription to continue managing your pharmacy
              incidents and reports.
            </p>
            {subscription?.currentPeriodEnd && (
              <p className="text-red-700 text-xs mt-2">
                Expired on:{" "}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButtonHref || "/pricing?upgrade=true"}
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              {primaryButtonText || "Renew Subscription"}
            </Link>
            <Link
              href={secondaryButtonHref || "/payment-history"}
              className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {secondaryButtonText || "View Payment History"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fallback - Unknown Status
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-4xl text-gray-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Subscription Status Unknown
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We couldn't determine your subscription status. Please contact support
          for assistance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/settings"
            className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go to Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatusScreen;
