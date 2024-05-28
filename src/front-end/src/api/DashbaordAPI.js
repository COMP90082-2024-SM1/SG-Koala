const baseUrl = process.env.REACT_APP_BASEURL;
export const getAllBooking = async () => {
  return fetch(baseUrl + "booking/", {credentials: "include",}).then((response) => {
    if (!response.ok) {
      if(response.status === 403) {
        throw new Error("Please Login first");
      } else {
        throw new Error("Network response was not ok");
      } 
    }
    return response;
  });
};

export const getAllMiscellaneous = async () => {
  return fetch(baseUrl + "miscellaneous/", {credentials: "include",}).then((response) => {
    if (!response.ok) {
      if(response.status === 403) {
        throw new Error("Please Login first");
      } else {
        throw new Error("Network response was not ok");
      }
    }
    return response.json();
  });
};
