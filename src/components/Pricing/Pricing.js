"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Card from "@/assets/images/card.png";

export default function Pricing() {
  const [plan, setPlan] = useState("monthly");

  return (
    <section className="pt-[20px] sm:pt0">
      <div className="flex justify-center  sm:justify-between items-center flex-wrap sm:flex-nowrap gap-4 mb-[30px]">
        <div className="flex items-center gap-4">
          <Link
            href=""
            className="h-[48px] w-[48px] min-w-[48px] bg-white flex items-center justify-center rounded-full border border-[#E7FBBD]"
          >
            <GoArrowLeft />
          </Link>
          <h3 className="text-[18px] md:text-[24px] 2xl:text-[32px]">Pricing Plan</h3>
        </div>
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
              className={`relative z-10 w-32 text-center font-medium cursor-pointer py-2 rounded-full transition-colors text-[14px] 2xl:text-[18px] ${plan === "monthly" ? "text-white bg-[#99C729]" : "text-gray-700"
                }`}
            >
              Monthly
            </label>
            <label
              htmlFor="yearly"
              className={`relative z-10 w-32 text-center font-medium cursor-pointer py-2 rounded-full transition-colors text-[14px] 2xl:text-[18px] ${plan === "yearly" ? "text-white bg-[#99C729]" : "text-gray-700"
                }`}
            >
              Yearly
            </label>
            <span
              className={`absolute top-2 left-2 w-[calc(50%-8px)] h-[calc(100%-16px)] bg-[#99C729] rounded-full transition-transform duration-300 ${plan === "yearly" ? "translate-x-full" : ""
                }`}
            ></span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pricingData.map((planData, index) => (
          <div key={index} className="bg-white p-[16px] 2xlp-[30px] rounded-[14px]">
            <div className="mb-4 pb-4 border-b border-[#DAECFF]">
              <div className="flex items-center justify-between mb-[10px]">
                <h3 className="text-[24px] 2xl:text-[32px]">
                  {plan === "monthly"
                    ? typeof planData.monthlyPrice === "number"
                      ? `$${planData.monthlyPrice}`
                      : planData.monthlyPrice
                    : typeof planData.yearlyPrice === "number"
                      ? `$${planData.yearlyPrice}`
                      : planData.yearlyPrice}
                  <span className="text-[14px] text-[#707B8A] font-normal">
                    /{plan === "monthly" ? "Monthly" : "Yearly"}
                  </span>
                  <button className="text-[12px] bg-[#99c7291c] text-[#99C729] px-[10px] py-[8px] rounded-full cursor-pointer ml-2">7 days free trial</button>
                </h3>
                <span className="text-[12px] font-medium text-[#3B82F6] uppercase bg-[#E3EDFD] inline-block py-[4px] px-[10px] rounded-full">
                  {planData.planType}
                </span>
              </div>
              <p className="text-[14px] text-[#374151]">
                {planData.planShortDesc}
              </p>
            </div>

            <ul className="text-[14px] font-medium text-[#262262] flex flex-col gap-3 mb-[40px]">
              {planData.features.map((feature, i) => (
                <li key={i} className="relative pl-[20px]">
                  <span className="absolute left-0 top-[4px] text-[#F97316]">
                    <FaCircleCheck />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Dialog>
              <DialogTrigger asChild>
                <button className="primary-btn !bg-transparent border !border-[#99C729] !text-[#99C729] cursor-pointer w-full hover:!bg-[#99C729] hover:!text-white">
                  Choose This Plan
                </button>
              </DialogTrigger>
              <DialogContent className="md:max-w-[566px] bg-white px-[16px] pt-[40px] sm:p-[40px]">
                <h4 className="md:text-[24px] text-[20px] mb-[20px]">Add your payment method</h4>
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="text-[12px] text-[#707B8A] mb-2.5 block">
                      Credit card number
                    </label>
                    <input
                      className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
                      type="text"
                      placeholder="**** **** **** 8032"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] text-[#707B8A] mb-2.5 block">
                      Card holder name
                    </label>
                    <input
                      className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
                      type="text"
                      placeholder="Eden Hazard"
                    />
                  </div>
                  <div className="flex gap-5">
                    <div>
                      <label className="text-[12px] text-[#707B8A] mb-2.5 block">
                        Expire
                      </label>
                      <input
                        className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
                        type="text"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#707B8A] mb-2.5 block">
                        CVV
                      </label>
                      <input
                        className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
                        type="text"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="primary-btn w-full cursor-pointer"
                  >
                    Proceed to Pay
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </section>
  );
}

const pricingData = [
  {
    title: "Basic",
    monthlyPrice: 100,
    yearlyPrice: 150,
    planType: "Basic Plan",
    planShortDesc: "What you get in this package",
    features: [
      "Monthly Error Log Dashboard",
      "Real-Time Error Reporting",
      "Collaborative Review and Analysis",
      "Data Analytics for Error Prevention",
    ],
  },
  {
    title: "Premium",
    monthlyPrice: 250,
    yearlyPrice: 500,
    planType: "Premium Plan",
    planShortDesc: "What you get in this package",
    features: [
      "Monthly Error Log Dashboard",
      "Real-Time Error Reporting",
      "Collaborative Review and Analysis",
      "Data Analytics for Error Prevention",
    ],
  },
  {
    title: "Enterprise",
    monthlyPrice: 300,
    yearlyPrice: 600,
    planType: "Enterprise Plan",
    planShortDesc: "What you get in this package",
    features: [
      "Monthly Error Log Dashboard",
      "Real-Time Error Reporting",
      "Collaborative Review and Analysis",
      "Data Analytics for Error Prevention",
    ],
  },
];
