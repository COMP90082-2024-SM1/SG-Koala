const baseUrl = process.env.REACT_APP_BASEURL;
export const getAllBooking = async () => {
  return fetch(baseUrl + "booking/").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  });
};

export const getAllMiscellaneous = async () => {
  return fetch(baseUrl + "miscellaneous/").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
