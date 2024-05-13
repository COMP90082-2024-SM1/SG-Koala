const baseUrl = "http://127.0.0.1:8000/api/";

export const getChartData = async (id) => {
  try {
    const url = baseUrl + "chart/" + id + "/";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};
