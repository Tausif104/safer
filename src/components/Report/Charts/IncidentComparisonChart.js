import React, { useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toPng } from "html-to-image";

const IncidentComparisonChart = ({
  setChartPng,
  dataset = [],
  options = { pvName: "Previous Period", uvName: "Current Period" },
}) => {
  const chartRef = useRef(null);

  const renderCustomTick = ({ x, y, payload }) => {
    const words = payload.value.split(" ");
    return (
      <g transform={`translate(${x},${y})`}>
        {words.map((word, index) => (
          <text
            key={index}
            x={0}
            y={0}
            dy={index * 15}
            textAnchor="end"
            fill="#666"
            fontSize={11}
            transform="rotate(-30)"
          >
            {word}
          </text>
        ))}
      </g>
    );
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (chartRef.current) {
        try {
          const dataUrl = await toPng(chartRef.current, {
            quality: 1.0,
            pixelRatio: 2,
            skipAutoScale: true,
            backgroundColor: "#ffffff",
          });
          setChartPng(dataUrl);
        } catch (error) {
          console.error("Error generating chart PNG:", error);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [setChartPng, dataset]);

  return (
    <ResponsiveContainer width="100%" height="100%" ref={chartRef}>
      <BarChart
        width={500}
        height={500}
        data={dataset}
        margin={{
          top: 5,
          right: 15,
          left: 15,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-30}
          textAnchor="end"
          height={60}
          tick={renderCustomTick}
        />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="bottom" align="center" />
        <Bar
          dataKey="pv"
          fill="#3498db"
          isAnimationActive={false}
          activeBar={<Rectangle fill="pink" stroke="blue" />}
          name={options.pvName}
        />
        <Bar
          dataKey="uv"
          fill="#e74c3c"
          isAnimationActive={false}
          activeBar={<Rectangle fill="gold" stroke="purple" />}
          name={options.uvName}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncidentComparisonChart;
