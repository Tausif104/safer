import { useEffect, useRef } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toPng } from "html-to-image";

export default function IncidentPieChart({ dataset, setChartPng }) {
  const chartRef = useRef(null);

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
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={dataset}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
