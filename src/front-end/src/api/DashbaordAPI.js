const baseUrl = process.env.REACT_APP_BASEURL + "api/";
export const getAllBooking = async () => {
  return fetch(baseUrl + "booking/").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  });
};
