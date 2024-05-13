import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { lineChartData } from "./FAKE_DATA";
import { getStudentAttedingInfoByYear } from "../../api/AnalyticsAPI";
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

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentAttedingInfoByYear();
        setChartData(data);
      } catch (error) {
        alert("[ERROR] Failed to fetch StudentAttedingInfoByYear.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  console.log(chartData);
  return <Line options={options} data={lineChartData}></Line>;
}

export default LineChart;
