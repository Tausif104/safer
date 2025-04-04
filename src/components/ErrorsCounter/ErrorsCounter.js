"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReportIcon from "@/assets/images/total-report-icon.svg";
import ErrorDetected from "@/assets/images/error-detected.png";
import MedicationError from "@/assets/images/medication-error.svg";
import ErrorLogged from "@/assets/images/error-logged.svg";
import { Progress } from "@/components/ui/progress";

const CounterItem = ({ endValue, label, format, icon, iconBgColor }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Animation duration in ms
    const steps = 60; // Number of animation steps
    const increment = endValue / steps; // Increment per step
    let currentStep = 0;

    const updateCounter = () => {
      if (currentStep < steps) {
        start += increment;
        setCount(start);
        currentStep++;
        requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
      }
    };

    updateCounter();
  }, [endValue]);

  // Format number based on the provided format
  const formatNumber = (num) => {
    if (format === "k" && num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    } else if (format === "+") {
      return Math.floor(num) + "+";
    }
    return Math.floor(num); // Default (no format)
  };

  return (
    <div className="bg-white rounded-[14px] flex justify-between items-center p-[20px] gap-3">
      <div>
        <h3 className="counter text-[30px] mb-1 gap-2.5">{formatNumber(count)}</h3>
        <p className="text-[16px]">{label}</p>
      </div>
      <div className="h-[68px] w-[68px] min-w-[68px] flex items-center justify-center rounded-[10px]" style={{ backgroundColor: iconBgColor }}>
        <Image width={40} height={40} src={icon} alt="report-icon" />
      </div>
    </div>
  );
};

const ErrorsCounter = () => {
  return (
    <section className="grid 2xl:grid-cols-[7fr_6fr] gap-[30px] sm:mb-[30px] py-[25px] sm:py-0 bg-[#F8F9FB] sm:bg-transparent">
      <div className="grid sm:grid-cols-2 sm:gap-6 gap-5">
        {/* Counter Items with Custom Formatting */}
        <CounterItem endValue={2500} label="Report Generated" format="k" icon={ReportIcon} iconBgColor="#3B82F6" />
        <CounterItem endValue={250} label="Error Detected" format="+" icon={ErrorDetected} iconBgColor="#A855F7" />
        <CounterItem endValue={1500} label="Medication Dispensing Errors" format="k" icon={MedicationError} iconBgColor="#F97316" />
        <CounterItem endValue={65} label="Monthly Error Logged" format="+" icon={ErrorLogged} iconBgColor="#00D0FF" />
      </div>

      {/* Progress Bar Section */}
      <div className="p-[16px] sm:p-[20px] rounded-[10px] bg-white">
        <h4 className="text-[16px] sm:text-[20px] mb-4">Errors in Medication Dispensing</h4>
        <div className="flex flex-col gap-2.5">
            <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
                <p className="text-[12px] sm:text-[14px]">Incorrect Quantity (Q)</p>
                <Progress value={90} className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
                <p className="text-[12px] sm:text-[14px]">Incorrect Drug (D)</p>
                <Progress value={70} className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
                <p className="text-[12px] sm:text-[14px]">Incorrect Strength (S)</p>
                <Progress value={60} className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
                <p className="text-[12px] sm:text-[14px]">Incorrect Directions</p>
                <Progress value={50} className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
                <p className="text-[12px] sm:text-[14px]">Labelling Error</p>
                <Progress value={40} className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
                <p className="text-[12px] sm:text-[14px]">Incorrect Form (F)</p>
                <Progress value={30} className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-5">
                <p className="text-[12px] sm:text-[14px]"></p>
                <div className="flex justify-between">
                  <p className="text-[12px] text-[#4B5563]">0</p>
                  <p className="text-[12px] text-[#4B5563]">2</p>
                  <p className="text-[12px] text-[#4B5563]">4</p>
                  <p className="text-[12px] text-[#4B5563]">6</p>
                  <p className="text-[12px] text-[#4B5563]">8</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorsCounter;
