import React from "react";
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip);

function PieChart({ data, options = {} }) {
  return <Pie options={options} data={data}></Pie>;
}

export default PieChart;
