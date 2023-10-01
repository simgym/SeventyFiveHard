import React from "react";
import "./graph.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const Graph = ({ dayCount }) => {
  // Ensure that dayCount does not exceed 75
  const limitedDayCount = Math.min(dayCount, 75);

  const data = Array.from({ length: 75 }, (_, i) => ({
    day: i + 1,
    successPercentage:
      i < limitedDayCount ? (limitedDayCount / 75) * 80 + 20 : null,
  }));

  // Get the width of the window
  const width = window.innerWidth > 600 ? 600 : window.innerWidth;

  return (
    <div className="graph-container">
      <BarChart width={width} height={300} data={data}>
        <XAxis dataKey="day" label={{ value: "Days", position: "bottom" }} />
        <YAxis
          domain={[20, 100]}
          label={{ value: "Score", angle: -90, position: "insideLeft" }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="successPercentage"
          name="Success Percentage"
          fill="rgb(75, 192, 192)"
        />
      </BarChart>
    </div>
  );
};

export default Graph;
