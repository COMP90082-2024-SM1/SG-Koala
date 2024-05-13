import { lineChartData } from "../components/Charts/FAKE_DATA";

const baseUrl = "http://127.0.0.1:8000/api/template/";

export const getStudentAttedingInfoByYear = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};
