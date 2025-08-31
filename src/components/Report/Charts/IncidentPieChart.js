import { useEffect, useRef } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { toPng } from "html-to-image";

export default function IncidentPieChart({ dataset, setChartPng }) {
  const chartRef = useRef(null);

  const COLORS = ["#e74c3c", "#3498db", "#f1c40f", "#1abc9c"];

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (dataset[index].value === 0) return null;

    const lineStartX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const lineStartY = cy + outerRadius * Math.sin(-midAngle * RADIAN);
    const lineEndX = x;
    const lineEndY = y;

    const words = dataset[index].name.split(" ");

    return (
      <g>
        <line
          x1={lineStartX}
          y1={lineStartY}
          x2={lineEndX}
          y2={lineEndY}
          stroke="#666"
          strokeWidth={1}
        />
        {words.map((word, wordIndex) => (
          <text
            key={wordIndex}
            x={x}
            y={y - 10 + wordIndex * 12}
            fill="#666"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            fontSize="11"
            fontWeight="500"
          >
            {word}
          </text>
        ))}
        <text
          x={x}
          y={y + words.length * 12 - 5}
          fill="#666"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize="10"
          fontWeight="400"
        >
          ({`${(percent * 100).toFixed(1)}%`})
        </text>
      </g>
    );
  };

  const renderInnerLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (dataset[index].value === 0) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14"
        fontWeight="bold"
      >
        {dataset[index].value}
      </text>
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
  }, [dataset, setChartPng]);

  return (
    <ResponsiveContainer width="100%" height="100%" ref={chartRef}>
      <PieChart
        width={400}
        height={400}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      >
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={dataset}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={renderInnerLabel}
          labelLine={false}
        >
          {dataset.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={dataset}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={80}
          label={renderCustomLabel}
          labelLine={false}
        >
          {dataset.map((entry, index) => (
            <Cell key={`cell-outer-${index}`} fill="transparent" />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
