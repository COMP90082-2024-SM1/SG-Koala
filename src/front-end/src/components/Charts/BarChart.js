import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { barChartData } from "./FAKE_DATA";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  Tooltip
);

function BarChart() {
  const options = {};
  const data = {};

  return <Bar options={options} data={barChartData}></Bar>;
}

export default BarChart;
