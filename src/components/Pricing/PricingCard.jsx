"use client";
import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useAuthStore from "@/store/useAuthStore";
import { paymentAPI } from "@/services/paymentService";
import getStripe from "@/lib/stripe";

const PricingCard = ({ plan, planType, onPlanSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuthStore();

  const handleSelectPlan = async () => {
    if (!token || !user) {
      alert("Please log in to continue");
      return;
    }

    setIsLoading(true);
    try {
      const response = await paymentAPI.createCheckoutSession(plan.id, token);

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Something went wrong. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDisplayPrice = () => {
    // The API returns the price directly, no need for monthlyPrice/yearlyPrice
    return `$${plan.price}`;
  };

  const getDisplayPeriod = () => {
    return planType === "monthly" ? "Monthly" : "Yearly";
  };

  return (
    <div className="bg-white p-[16px] 2xl:p-[30px] rounded-[14px] relative">
      <div className="mb-4 pb-4 border-b border-[#DAECFF]">
        <div className="flex items-center justify-between mb-[10px]">
          <h3 className="text-[24px] 2xl:text-[32px]">
            {getDisplayPrice()}
            <span className="text-[14px] text-[#707B8A] font-normal">
              /{getDisplayPeriod()}
            </span>
            <button className="text-[12px] bg-[#99c7291c] text-[#99C729] px-[10px] py-[8px] rounded-full cursor-pointer ml-2">
              7 days free trial
            </button>
          </h3>
          <span className="text-[12px] font-medium text-[#3B82F6] uppercase bg-[#E3EDFD] inline-block py-[4px] px-[10px] rounded-full">
            {plan.name}
          </span>
        </div>
        <p className="text-[14px] text-[#374151]">{plan.description}</p>
      </div>

      <ul className="text-[14px] font-medium text-[#262262] flex flex-col gap-3 mb-[40px]">
        {plan.features?.map((feature, i) => (
          <li key={i} className="relative pl-[20px]">
            <span className="absolute left-0 top-[4px] text-[#F97316]">
              <FaCircleCheck />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        onClick={handleSelectPlan}
        disabled={isLoading}
        className="primary-btn !bg-transparent border !border-[#99C729] !text-[#99C729] cursor-pointer w-full hover:!bg-[#99C729] hover:!text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" />
            <span>Processing...</span>
          </div>
        ) : (
          "Choose This Plan"
        )}
      </Button>
    </div>
  );
};

export default PricingCard;
