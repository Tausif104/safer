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
  Rectangle,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, ArrowRight } from "lucide-react";

const monthlyData = {
  January: [
    { name: "M", Pharmacy: 2000, Pharmacist: 2400, FreeTrail: 8000 },
    { name: "T", Pharmacy: 3000, Pharmacist: 1398, FreeTrail: 5000 },
    { name: "W", Pharmacy: 5000, Pharmacist: 3800, FreeTrail: 3000 },
    { name: "T", Pharmacy: 2780, Pharmacist: 3908, FreeTrail: 2000 },
    { name: "F", Pharmacy: 3890, Pharmacist: 800, FreeTrail: 2400 },
    { name: "S", Pharmacy: 2390, Pharmacist: 3800, FreeTrail: 2300 },
    { name: "S", Pharmacy: 9490, Pharmacist: 4300, FreeTrail: 1300 },
  ],
  February: [
    { name: "M", Pharmacy: 1500, Pharmacist: 2000, FreeTrail: 7000 },
    { name: "T", Pharmacy: 2500, Pharmacist: 1400, FreeTrail: 6000 },
    { name: "W", Pharmacy: 4000, Pharmacist: 3200, FreeTrail: 2500 },
    { name: "T", Pharmacy: 2000, Pharmacist: 3500, FreeTrail: 1500 },
    { name: "F", Pharmacy: 3100, Pharmacist: 500, FreeTrail: 2000 },
    { name: "S", Pharmacy: 2000, Pharmacist: 3000, FreeTrail: 1700 },
    { name: "S", Pharmacy: 8600, Pharmacist: 3500, FreeTrail: 1200 },
  ],
  March: [
    { name: "M", Pharmacy: 2000, Pharmacist: 2400, FreeTrail: 8000 },
    { name: "T", Pharmacy: 3000, Pharmacist: 1398, FreeTrail: 5000 },
    { name: "W", Pharmacy: 5000, Pharmacist: 3800, FreeTrail: 3000 },
    { name: "T", Pharmacy: 2780, Pharmacist: 3908, FreeTrail: 2000 },
    { name: "F", Pharmacy: 3890, Pharmacist: 800, FreeTrail: 2400 },
    { name: "S", Pharmacy: 2390, Pharmacist: 3800, FreeTrail: 2300 },
    { name: "S", Pharmacy: 9490, Pharmacist: 4300, FreeTrail: 1300 },
  ],
  April: [
    { name: "M", Pharmacy: 1500, Pharmacist: 2000, FreeTrail: 7000 },
    { name: "T", Pharmacy: 2500, Pharmacist: 1400, FreeTrail: 6000 },
    { name: "W", Pharmacy: 4000, Pharmacist: 3200, FreeTrail: 2500 },
    { name: "T", Pharmacy: 2000, Pharmacist: 3500, FreeTrail: 1500 },
    { name: "F", Pharmacy: 3100, Pharmacist: 500, FreeTrail: 2000 },
    { name: "S", Pharmacy: 2000, Pharmacist: 3000, FreeTrail: 1700 },
    { name: "S", Pharmacy: 8600, Pharmacist: 3500, FreeTrail: 1200 },
  ],

  // Add other months data here...
};

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
    <div className='bg-white rounded-[14px] flex justify-between items-center p-[20px] gap-3'>
      <div>
        <h3 className='counter text-[30px] mb-1 gap-2.5'>
          {formatNumber(count)}
        </h3>
        <p className='text-[16px]'>{label}</p>
      </div>
      <div
        className='h-[68px] w-[68px] min-w-[68px] flex items-center justify-center rounded-[10px]'
        style={{ backgroundColor: iconBgColor }}
      >
        <Image width={40} height={40} src={icon} alt='report-icon' />
      </div>
    </div>
  );
};

const RoundedTopBar = function (props) {
  const { x, y, width, height, fill } = props;
  const radius = 15;
  const r = Math.min(radius, height);

  const path = `
    M${x},${y + height} 
    V${y + r} 
    Q${x},${y} ${x + r},${y}
    H${x + width - r} 
    Q${x + width},${y} ${x + width},${y + r} 
    V${y + height} 
    Z
  `;

  return React.createElement("path", { d: path, fill });
};
const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <ul className='flex space-x-4 justify-center mt-[16px]'>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className='flex items-center space-x-2'>
          <div
            style={{ backgroundColor: entry.color }}
            className='w-3 h-3 rounded-full'
          />
          <span className='text-sm text-[#000] font-medium'>
            {entry.value === "FreeTrail"
              ? "Free Trail (Pharmacy)"
              : entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

const ErrorsCounter = () => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0); // Initial month set to January (0th index)
  const [data, setData] = useState(monthlyData["January"]); // Default data for January

  const months = Object.keys(monthlyData); // Get month names (January, February, etc.)

  const handleMonthChange = (direction) => {
    let newMonthIndex = selectedMonthIndex + direction;
    if (newMonthIndex < 0) newMonthIndex = months.length - 1; // Loop to last month if going backwards
    if (newMonthIndex >= months.length) newMonthIndex = 0; // Loop to first month if going forwards

    setSelectedMonthIndex(newMonthIndex);
    setData(monthlyData[months[newMonthIndex]]);
  };

  return (
    <section className='grid 2xl:grid-cols-[7fr_6fr] gap-[30px] sm:mb-[30px] py-[25px] sm:py-0 bg-[#F8F9FB] sm:bg-transparent'>
      {/* Month Navigation with Next and Previous Buttons */}

      <div className='grid sm:grid-cols-2 sm:gap-6 gap-5'>
        <CounterItem
          endValue={2500}
          label='Report Generated'
          format='k'
          icon={ReportIcon}
          iconBgColor='#3B82F6'
        />
        <CounterItem
          endValue={250}
          label='Error Detected'
          format='+'
          icon={ErrorDetected}
          iconBgColor='#A855F7'
        />
        <CounterItem
          endValue={1500}
          label='Medication Dispensing Errors'
          format='k'
          icon={MedicationError}
          iconBgColor='#F97316'
        />
        <CounterItem
          endValue={65}
          label='Monthly Error Logged'
          format='+'
          icon={ErrorLogged}
          iconBgColor='#00D0FF'
        />
      </div>

      <div className='p-[16px] sm:p-[20px] rounded-[10px] bg-white'>
        <h4 className='text-[16px] sm:text-[20px] mb-4 text-center'>
          Subscription Report
        </h4>
        <div className='flex justify-between items-center mb-4'>
          <button
            onClick={() => handleMonthChange(-1)}
            className='text-[15px] text-[#4B5563] p-2 rounded-full border border-[#DAECFF] w-[34px] h-[34px] flex items-center justify-center hover:bg-[#7fb0e4] hover:text-white transition-all delay-300 cursor-pointer'
          >
            <ArrowLeft />
          </button>
          <div>
            <h3 className='text-center text-[16px] font-semibold uppercase'>
              {months[selectedMonthIndex]}
            </h3>
            <p className='text-[#707B8A] text-[12px] text-center mt-[4px]'>
              2025
            </p>
          </div>

          <button
            onClick={() => handleMonthChange(1)}
            className='text-[15px] text-[#4B5563] p-2 rounded-full border border-[#DAECFF] w-[34px] h-[34px] flex items-center justify-center hover:bg-[#7fb0e4] hover:text-white transition-all delay-300 cursor-pointer'
          >
            <ArrowRight />
          </button>
        </div>

        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            data={data}
            barSize={30}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey='name' />
            <Tooltip />
            <Legend content={<CustomLegend />} />
            <Bar dataKey='Pharmacy' stackId='a' fill='#99C729' />
            <Bar dataKey='Pharmacist' stackId='a' fill='#3B82F6' />
            <Bar
              dataKey='FreeTrail'
              stackId='a'
              fill='#F60000'
              shape={React.createElement(RoundedTopBar)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ErrorsCounter;
