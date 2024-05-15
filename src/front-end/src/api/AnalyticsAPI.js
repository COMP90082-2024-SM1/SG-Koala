const baseUrl = process.env.REACT_APP_BASEURL + "api/chart/";

export const getChartData = async (id) => {
  try {
    const url = baseUrl + id + "/";
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
