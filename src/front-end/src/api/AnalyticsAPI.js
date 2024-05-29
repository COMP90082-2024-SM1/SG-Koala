const baseUrl = process.env.REACT_APP_BASEURL + "chart/";

export const getChartData = async (id) => {
  try {
    const url = baseUrl + id + "/";
    const response = await fetch(url, {credentials: "include",});
    if (!response.ok) {
      if(response.status === 403) {
        throw new Error("Please Login first");
      } else {
        throw new Error("Network response was not ok");
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};
