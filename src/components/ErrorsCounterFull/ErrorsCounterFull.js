"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CounterIcon1 from "@/assets/images/counter-icon1.svg";
import CounterIcon2 from "@/assets/images/counter-icon2.svg";
import CounterIcon3 from "@/assets/images/counter-icon3.svg";
import CounterIcon4 from "@/assets/images/counter-icon4.svg";

const CounterItem = ({ endValue, label, format, icon, iconBgColor }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const steps = 60;
    const increment = endValue / steps;
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

  const formatNumber = (num) => {
    if (format === "k" && num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    } else if (format === "+") {
      return Math.floor(num) + "+";
    }
    return Math.floor(num);
  };

  return (
    <div className="bg-white rounded-[14px] flex justify-between flex-col p-[20px] sm:gap-5 gap-3">
      <div
        className="sm:h-[80px] h-[48px] sm:w-[80px] w-[48px] sm:min-w-[80px] min-w-[48px] flex items-center justify-center rounded-full"
        style={{ backgroundColor: iconBgColor }}
      >
        <Image
          className="sm:w-[40px] w-[25px] sm:h-[40px] h-[25px]"
          src={icon}
          alt="report-icon"
        />
      </div>
      <div>
        <h3 className="counter sm:text-[36px] text-[24px] mb-1 gap-2.5">
          {formatNumber(count)}
        </h3>
        <p className="sm:text-[16px] text-[14px]">{label}</p>
      </div>
    </div>
  );
};

const ErrorsCounterFull = () => {
  return (
    <section className="sm:mb-[30px] py-[25px] sm:py-0 bg-[#F8F9FB] sm:bg-transparent">
      {/* Month Navigation with Next and Previous Buttons */}

      <div className="grid xl:grid-cols-4 grid-cols-2 sm:gap-6 gap-5">
        <CounterItem
          endValue={3500}
          label="Total Subscribed Pharmacies"
          format="k"
          icon={CounterIcon1}
          iconBgColor="#3B82F6"
        />
        <CounterItem
          endValue={150}
          label="Total Pharmacists"
          format="+"
          icon={CounterIcon2}
          iconBgColor="#A855F7"
        />
        <CounterItem
          endValue={1500}
          label="Total Subscribed Pharmacists"
          format="k"
          icon={CounterIcon3}
          iconBgColor="#F97316"
        />
        <CounterItem
          endValue={75}
          label="Total Incidents Logged"
          format="+"
          icon={CounterIcon4}
          iconBgColor="#00D0FF"
        />
      </div>
    </section>
  );
};

export default ErrorsCounterFull;
