"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MainSidebar from "../MainSidebar/MainSidebar";
import Header3 from "../Header3/Header3";
import MobileNav from "../MobileNav/MobileNav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SubscriptionStatusScreen from "../SubscriptionStatusScreen/SubscriptionStatusScreen";
import useAuthStore from "@/store/useAuthStore";
import { USER_ROLE } from "@/config/constant";
import { getSubscriptionStatusFromErrorCode } from "@/config/error-codes";

const DashboardLayout = ({ children, requireSubscription = true }) => {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Reset check when navigating to a new page
  useEffect(() => {
    if (pathname !== lastPathname) {
      setHasChecked(false);
      setSubscriptionError(null);
      setLastPathname(pathname);
    }
  }, [pathname, lastPathname]);

  useEffect(() => {
    // Only clear errors and check once per page load
    if (hasChecked) return;

    // Clear old subscription error to allow fresh API calls
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("subscription_error");
      setSubscriptionError(null);
    }

    // Only check for subscription errors if protection is required and user is PHARMACY role
    if (requireSubscription && user?.role === USER_ROLE.PHARMACY) {
      let timeoutId;
      let intervalId;
      let stopped = false;

      const checkSubscriptionError = () => {
        if (stopped) return;

        if (typeof window !== "undefined") {
          const errorData = sessionStorage.getItem("subscription_error");
          if (errorData) {
            try {
              const error = JSON.parse(errorData);
              // Only use errors from last 5 seconds to ensure fresh data
              if (Date.now() - error.timestamp < 5000) {
                setSubscriptionError(error);
                setHasChecked(true); // Stop checking once error is found
                stopped = true;
                if (intervalId) clearInterval(intervalId);
              } else {
                sessionStorage.removeItem("subscription_error");
                setSubscriptionError(null);
              }
            } catch (e) {
              console.error("Error parsing subscription error:", e);
            }
          }
        }
      };

      // Wait 500ms before starting to check (let API call happen first)
      timeoutId = setTimeout(() => {
        checkSubscriptionError();

        // Continue checking every second for up to 10 seconds
        let checkCount = 0;
        intervalId = setInterval(() => {
          checkCount++;
          if (checkCount > 10 || stopped) {
            clearInterval(intervalId);
            if (!stopped) {
              setHasChecked(true); // Mark as checked after 10 seconds even if no error
            }
            return;
          }
          checkSubscriptionError();
        }, 1000);
      }, 500);

      return () => {
        stopped = true;
        if (timeoutId) clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
      };
    } else {
      setHasChecked(true);
    }
  }, [requireSubscription, user?.role, hasChecked]);

  // Clear error when user navigates away or dismisses
  const clearSubscriptionError = () => {
    setSubscriptionError(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("subscription_error");
    }
  };

  const content = (
    <>
      <MainSidebar />
      <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[180px] sm:pb-[30px]">
        <Header3 />
        {children}
        <MobileNav />
      </div>
    </>
  );

  // If there's a subscription error, show the subscription screen
  if (subscriptionError && user?.role === USER_ROLE.PHARMACY) {
    return (
      <SubscriptionStatusScreen
        subscription={
          subscriptionError.expiredAt
            ? {
                trialEnd: subscriptionError.expiredAt,
                currentPeriodEnd: subscriptionError.expiredAt,
              }
            : null
        }
        isTrialExpired={subscriptionError.status === "TRIAL_EXPIRED"}
        canAccess={false}
      />
    );
  }

  // If subscription is not required (e.g., profile, settings), render without protection
  if (!requireSubscription) {
    return content;
  }

  // Otherwise, wrap with ProtectedRoute
  return <ProtectedRoute>{content}</ProtectedRoute>;
};

export default DashboardLayout;
