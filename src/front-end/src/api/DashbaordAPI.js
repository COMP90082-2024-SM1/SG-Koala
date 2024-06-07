import { getAuthToken } from "./Cookie";

const baseUrl = process.env.REACT_APP_BASEURL;
export const getAllBooking = async () => {
  const accessToken = getAuthToken();
  return fetch(baseUrl + "booking/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Please Login first");
      } else {
        throw new Error("Network response was not ok");
      }
    }

    return response;
  });
};

export const getAllMiscellaneous = async () => {
  const accessToken = getAuthToken();
  return fetch(baseUrl + "booking/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Please Login first");
      } else {
        throw new Error("Network response was not ok");
      }
    }
    return response.json();
  });
};
