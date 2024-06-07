const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const baseUrl = process.env.REACT_APP_BASEURL;
export const getAllBooking = async () => {
  /* const csrfToken = getCookie("csrftoken");
  const sessionID = getCookie("sessionid"); */
  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  console.log("checking token");
  console.log(authTokens);
  return fetch(baseUrl + "booking/", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(authTokens.access),
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
  return fetch(baseUrl + "miscellaneous/", { credentials: "include" }).then(
    (response) => {
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Please Login first");
        } else {
          throw new Error("Network response was not ok");
        }
      }
      return response.json();
    }
  );
};
