import React from "react";
import { Pie } from "react-chartjs-2";
import { pieChartData } from "./FAKE_DATA";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip);

function PieChart() {
  const options = {};
  const data = {};

  return <Pie options={options} data={pieChartData}></Pie>;
}

export default PieChart;
