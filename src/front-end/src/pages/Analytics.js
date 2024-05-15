import React, { useState, useEffect } from "react";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import { getChartData } from "../api/AnalyticsAPI";
import "../styles/Analytics.css";
import Header from "../components/Header/Header";
import { TypographyH2 } from "../components/Typography/Typography";

const generateLineChartData = (apiData) => {
  const transformedData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "number of Registered",
        data: apiData.registrants, // Use registrants data for "number of Registered"
        backgroundColor: "red",
        order: 1,
      },
      {
        label: "number of Attended",
        data: apiData.participants, // Use participants data for "number of attended"
        backgroundColor: "rgb(75, 192, 192)",
        order: 0,
      },
    ],
  };

  return transformedData;
};

const generateChartDataByTerm = (input, property) => {
  const labels = ["Term1", "Term2", "Term3", "Term4"];
  const datasets = [];

  for (const [stream, data] of Object.entries(input[property])) {
    datasets.push({
      label: stream,
      data: data,
      backgroundColor: getRandomColor(),
      borderColor: getRandomColor(),
      borderWidth: 2,
    });
  }

  return { labels: labels, datasets: datasets };
};

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

const generatePieChartData = (data4, selectedStream) => {
  if (!data4 || !data4.grades_by_stream[selectedStream]) {
    return { labels: [], datasets: [] }; // Return empty data if the selected stream is not available
  }

  const grades = Object.keys(data4.grades_by_stream[selectedStream]);
  const values = grades.map(
    (grade) => data4.grades_by_stream[selectedStream][grade]
  );

  return {
    labels: grades,
    datasets: [
      {
        label: "number",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
};

function Analytics() {
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [data4, setData4] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState("");
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data1 = await getChartData(1);
        const transformedData1 = generateLineChartData(data1);
        setData1(transformedData1);

        const data2 = await getChartData(2);
        const transformedData2 = generateChartDataByTerm(data2, "streams");
        setData2(transformedData2);

        const data3 = await getChartData(3);
        const transformedData3 = generateChartDataByTerm(data3, "locations");
        setData3(transformedData3);

        const data4 = await getChartData(4);
        setPieChartData(generatePieChartData(data4, selectedStream));
        setData4(data4);
        if (Object.keys(data4).length > 0) {
          const firstStream = Object.keys(data4["grades_by_stream"])[0];
          setSelectedStream(firstStream);
          setPieChartData(generatePieChartData(data4, firstStream));
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert(
          "[ERROR] Failed to fetch Student Attending Info By Year. Please check the console for more details."
        );
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      x: { stacked: true },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "number of student",
        },
      },
    },
  };

  const opt = {
    scales: {
      y: {
        title: {
          display: true,
          text: "number of student",
        },
      },
    },
  };

  const handleStreamChange = (event) => {
    const selectedStream = event.target.value;

    setSelectedStream(selectedStream);
    setPieChartData(generatePieChartData(data4, selectedStream));
  };

  return (
    <>
      <Header>Analytics</Header>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className="analyticsChartWrapper">
          <div className="analyticsChart">
            <TypographyH2 className="analyticsChartTitle">
              Number of Participants and Registrants Each Month
            </TypographyH2>
            {Object.keys(data1).length > 0 ? (
              <BarChart data={data1} options={options} onResize />
            ) : (
              <div>No data available.</div>
            )}
          </div>
          <div className="analyticsChart">
            <TypographyH2 className="analyticsChartTitle">
              Number of Participants in Each Term by Stream
            </TypographyH2>
            {Object.keys(data2).length > 0 ? (
              <LineChart data={data2} options={opt} />
            ) : (
              <div>No data available.</div>
            )}
          </div>
          <div className="analyticsChart">
            <TypographyH2 className="analyticsChartTitle">
              Number of Participants in Each Term by Locations
            </TypographyH2>
            {Object.keys(data3).length > 0 ? (
              <LineChart data={data3} options={opt} />
            ) : (
              <div>No data available.</div>
            )}
          </div>
          <div className="analyticsChart">
            <TypographyH2 className="analyticsChartTitle">
              Grade Distribution for Each Stream
            </TypographyH2>
            <select
              className="analyticsChartSelector"
              value={selectedStream}
              onChange={handleStreamChange}
            >
              {Object.keys(data4["grades_by_stream"]).map((stream, index) => (
                <option key={index} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
            {Object.keys(pieChartData).length > 0 ? (
              <PieChart
                data={pieChartData}
                style={{ width: "200px", height: "200px" }}
              />
            ) : (
              <div>No data available.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Analytics;
