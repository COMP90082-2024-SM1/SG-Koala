const baseUrl = process.env.REACT_APP_BASEURL;

export const getAllTemplates = async () => {
  return fetch(baseUrl + "template/", {credentials: "include",}).then((response) => {
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

export const getAllMiscellaneous = async () => {
  return fetch(baseUrl + "miscellaneous/", {credentials: "include",}).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const getAllSchool = async () => {
  return fetch(baseUrl + "school/", {credentials: "include",}).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const createNewBooking = async (bookingData) => {
  return fetch(baseUrl + "booking/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
  return fetch(baseUrl + "school/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
  return fetch(baseUrl + `checklist/${id}/`, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const updateChecklistById = async (id, checklistData) => {
  try {
    const response = await fetch(baseUrl + `checklist/${id}/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
  try {
    const response = await fetch(baseUrl + `booking/${id}/`, {credentials: "include",});
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
  try {
    const response = await fetch(baseUrl + `school/${id}/`, {credentials: "include",});
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
  return fetch(baseUrl + `checklist/${id}/`, {credentials: "include",}).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const getAllBooking = async () => {
  return fetch(baseUrl + "booking/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
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

export const updateMiscellaneous = async (newOptions) => {
  console.log("Sending data:", newOptions);
  try {
    const response = await fetch(baseUrl + "miscellaneous/", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOptions),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Successfully updated:", data);
  } catch (error) {
    console.error("Error updating miscellaneous data:", error);
  }
};

export const updateBooking = async (id, bookingData) => {
  return fetch(baseUrl + `booking/${id}/`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
  return fetch(baseUrl + `school/${id}/`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
  return fetch(baseUrl + `school/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const DeleteCheckListById = async (id) => {
  return fetch(baseUrl + `checklist/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const deleteBooking = async (id, bookingData) => {
  return fetch(baseUrl + `booking/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
