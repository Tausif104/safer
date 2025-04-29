"use client";
import React, { useEffect, useState } from "react";
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
  LineChart,
  Line,
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

// line chart 
const lineData  = [
  {
    name: 'Saturday',
    pv: 5000,
  },
  {
    name: 'Sunday',
    pv: 3500,
  },
  {
    name: 'Monday',
    pv: 7000,
  },
  {
    name: 'Tuesday',
    pv: 5500,
  },
  {
    name: 'Wednesday',
    pv: 3500,
  },
  {
    name: 'Thursday',
    pv: 3000,
  },
  {
    name: 'Friday',
    pv: 5000,
  },
];

const Charts = () => {
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
    <section className='grid 2xl:grid-cols-[8fr_4fr] xl:grid-cols-[7fr_5fr] gap-[30px] sm:mb-[30px] py-[25px] sm:py-0 bg-[#F8F9FB] sm:bg-transparent'>
      <div className='p-[16px] sm:p-[20px] rounded-[10px] bg-white'>
        <div className="flex justify-between items-center mb-4">
          <h4 className='text-[16px] sm:text-[20px] mb-4 text-center'>
            Revenue Report
          </h4>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={lineData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
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

export default Charts;
