import React from "react";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";

function Analytics() {
  return (
    <div>
      <LineChart></LineChart>
      <BarChart></BarChart>
      <PieChart></PieChart>
    </div>
  );
}
export default Analytics;
