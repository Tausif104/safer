"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api-interceptor";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { API_BASE_URL } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";
import PricingCard from "./PricingCard";
import { subscriptionAPI } from "@/services/paymentService";

export default function Pricing() {
  const [plan, setPlan] = useState("monthly");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUpgrade = searchParams?.get("upgrade") === "true";
  const [isLoading, setIsLoading] = useState(false);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const { token, setIsAuthenticated, user, isAuthenticated } = useAuthStore();

  // Fetch pricing plans from backend
  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        setLoadingPlans(true);
        const response = await subscriptionAPI.getPricingPlans();
        setPricingPlans(response.data || []);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
        setPricingPlans([]);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPricingPlans();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    if (!token) {
      alert("Something went wrong. Please try again or contact support.");
      setIsLoading(false);
      return;
    }

    try {
      await api.post(`${API_BASE_URL}/api/v1/auth/verify-token`, { token });
      setIsAuthenticated(true);
    } catch (error) {
      alert(
        "Session expired or something went wrong. Please try again or contact support."
      );
    } finally {
      setIsLoading(false);
    }
    router.push("/configuration-step1");
  };

  const getDisplayPlans = () => {
    if (pricingPlans.length > 0) {
      return pricingPlans.filter(
        (planData) => planData.type === plan.toUpperCase()
      );
    }
    return [];
  };

  return (
    <section className="pt-[20px] sm:pt0">
      <div className="flex justify-center  sm:justify-between items-center flex-wrap sm:flex-nowrap gap-4 mb-[30px]">
        {!isAuthenticated && (
          <div className="flex items-center gap-4">
            <Link
              href=""
              className="h-[48px] w-[48px] min-w-[48px] bg-white flex items-center justify-center rounded-full border border-[#E7FBBD]"
            >
              <GoArrowLeft />
            </Link>
            <h3 className="text-[18px] md:text-[24px] 2xl:text-[32px]">
              Pricing Plan
            </h3>
          </div>
        )}
        {isAuthenticated && (
          <div className="gap-4">
            <h3 className="text-[18px] md:text-[24px] 2xl:text-[32px] font-medium">
              {isUpgrade ? "Upgrade Your Plan" : "Pick a plan"}
            </h3>
            <p className="text-[14px] text-[#707B8A]">
              {isUpgrade
                ? "Choose a paid plan to unlock all features"
                : "Pick a plan that suits your needs and continue your journey with us."}
            </p>
          </div>
        )}
        <div className="flex justify-center">
          <div className="relative inline-flex p-2 border border-[#99C729] rounded-full bg-white">
            <input
              id="monthly"
              type="radio"
              name="switch"
              className="absolute opacity-0"
              checked={plan === "monthly"}
              onChange={() => setPlan("monthly")}
            />
            <input
              id="yearly"
              type="radio"
              name="switch"
              className="absolute opacity-0"
              checked={plan === "yearly"}
              onChange={() => setPlan("yearly")}
            />
            <label
              htmlFor="monthly"
              className={`relative z-10 w-32 text-center font-medium cursor-pointer py-2 rounded-full transition-colors text-[14px] 2xl:text-[18px] ${
                plan === "monthly" ? "text-white bg-[#99C729]" : "text-gray-700"
              }`}
            >
              Monthly
            </label>
            <label
              htmlFor="yearly"
              className={`relative z-10 w-32 text-center font-medium cursor-pointer py-2 rounded-full transition-colors text-[14px] 2xl:text-[18px] ${
                plan === "yearly" ? "text-white bg-[#99C729]" : "text-gray-700"
              }`}
            >
              Yearly
            </label>
            <span
              className={`absolute top-2 left-2 w-[calc(50%-8px)] h-[calc(100%-16px)] bg-[#99C729] rounded-full transition-transform duration-300 ${
                plan === "yearly" ? "translate-x-full" : ""
              }`}
            ></span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loadingPlans ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-[16px] 2xl:p-[30px] rounded-[14px] animate-pulse"
            >
              <div className="mb-4 pb-4 border-b border-[#DAECFF]">
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="space-y-3 mb-[40px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ))
        ) : getDisplayPlans().length > 0 ? (
          getDisplayPlans().map((planData, index) => (
            <PricingCard
              key={planData.id || index}
              plan={planData}
              planType={plan}
              isUpgrade={isUpgrade}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 text-lg">
              No pricing plans available for {plan} billing.
            </div>
            <div className="text-gray-400 text-sm mt-2">
              Please try switching to the other billing period or contact
              support.
            </div>
          </div>
        )}
      </div>
      {!isAuthenticated && (
        <div className="text-right mt-[30px] sm:mt-[50px] 2xl:mt-0">
          <Button
            onClick={handleLogin}
            className="primary-btn w-full sm:w-[390px] 2xl:!absolute 2xl:bottom-[50px] 2xl:right-[30px] cursor-pointer hover:cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" className="text-white" />
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
