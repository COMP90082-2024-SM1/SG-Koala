import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { lineChartData } from "./FAKE_DATA";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

function LineChart() {
  const options = {};
  const data = {};

  return <Line options={options} data={lineChartData}></Line>;
}

export default LineChart;
