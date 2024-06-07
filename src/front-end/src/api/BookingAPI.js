import { getAuthToken } from "./Cookie";
const baseUrl = process.env.REACT_APP_BASEURL;

export const getAllTemplates = async () => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + "template/", {
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

export const getAllMiscellaneous = async () => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + "miscellaneous/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const getAllSchool = async () => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + "school/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const createNewBooking = async (bookingData) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + "booking/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookingData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const createNewSchool = async (bookingData) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + "school/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookingData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const createNewChecklist = async (id) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + `checklist/${id}/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const updateChecklistById = async (id, checklistData) => {
  const accessToken = getAuthToken();

  try {
    const response = await fetch(baseUrl + `checklist/${id}/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(checklistData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating checklist with ID ${id}:`, error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  const accessToken = getAuthToken();

  try {
    const response = await fetch(baseUrl + `booking/${id}/`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching booking with ID ${id}:`, error);
    throw error;
  }
};

export const getSchoolById = async (id) => {
  const accessToken = getAuthToken();

  try {
    const response = await fetch(baseUrl + `school/${id}/`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching school with ID ${id}:`, error);
    throw error;
  }
};
export const getChecklistById = async (id) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + `checklist/${id}/`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

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
    return response.json();
  });
};

export const updateMiscellaneous = async (newOptions) => {
  const accessToken = getAuthToken();

  try {
    const response = await fetch(baseUrl + "miscellaneous/", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newOptions),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error updating miscellaneous data:", error);
  }
};

export const updateBooking = async (id, bookingData) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + `booking/${id}/`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookingData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const updateSchoolById = async (id, school) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + `school/${id}/`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(school),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const DeleteSchoolById = async (id) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + `school/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const DeleteCheckListById = async (id) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + `checklist/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const deleteBooking = async (id, bookingData) => {
  const accessToken = getAuthToken();

  return fetch(baseUrl + `booking/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookingData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
