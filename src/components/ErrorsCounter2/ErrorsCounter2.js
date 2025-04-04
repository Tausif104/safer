"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReportIcon from "@/assets/images/total-report-icon.svg";
import ErrorDetected from "@/assets/images/error-detected.png";
import MedicationError from "@/assets/images/medication-error.svg";
import ErrorLogged from "@/assets/images/error-logged.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
    <div className="bg-white rounded-[14px] flex justify-between items-center p-[20px] gap-3">
      <div>
        <h3 className="counter text-[30px] mb-1 gap-2.5">
          {formatNumber(count)}
        </h3>
        <p className="text-[16px]">{label}</p>
      </div>
      <div
        className="h-[68px] w-[68px] min-w-[68px] flex items-center justify-center rounded-[10px]"
        style={{ backgroundColor: iconBgColor }}
      >
        <Image width={40} height={40} src={icon} alt="report-icon" />
      </div>
    </div>
  );
};

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const ErrorsCounter = () => {
  return (
    <section className="grid 2xl:grid-cols-[7fr_6fr] gap-[30px] sm:mb-[30px] py-[25px] sm:py-0 bg-[#F8F9FB] sm:bg-transparent">
      <div className="grid sm:grid-cols-2 sm:gap-6 gap-5">
        <CounterItem endValue={2500} label="Report Generated" format="k" icon={ReportIcon} iconBgColor="#3B82F6" />
        <CounterItem endValue={250} label="Error Detected" format="+" icon={ErrorDetected} iconBgColor="#A855F7" />
        <CounterItem endValue={1500} label="Medication Dispensing Errors" format="k" icon={MedicationError} iconBgColor="#F97316" />
        <CounterItem endValue={65} label="Monthly Error Logged" format="+" icon={ErrorLogged} iconBgColor="#00D0FF" />
      </div>

      <div className="p-[16px] sm:p-[20px] rounded-[10px] bg-white">
        <h4 className="text-[16px] sm:text-[20px] mb-4">Errors in Medication Dispensing</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ErrorsCounter;
