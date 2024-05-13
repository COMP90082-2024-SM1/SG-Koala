export const getAllTemplates = async () => {
  return fetch("http://127.0.0.1:8000/api/template/").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const getAllMiscellaneous = async () => {
  return fetch("http://127.0.0.1:8000/api/miscellaneous/").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const getAllSchool = async () => {
  return fetch("http://127.0.0.1:8000/api/school/").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const createNewBooking = async (bookingData) => {
  return fetch("http://127.0.0.1:8000/api/booking/", {
    method: "POST",
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
  return fetch("http://127.0.0.1:8000/api/school/", {
    method: "POST",
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
  return fetch(`http://127.0.0.1:8000/api/checklist/${id}/`, {
    method: "POST",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const updateChecklistById = async (id, checklistData) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/checklist/${id}/`, {
      method: "PUT",
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
    const response = await fetch(`http://127.0.0.1:8000/api/booking/${id}/`);
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
    const response = await fetch(`http://127.0.0.1:8000/api/school/${id}/`);
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
  return fetch(`http://127.0.0.1:8000/api/checklist/${id}/`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );
};

export const getAllBooking = async () => {
  return fetch("http://127.0.0.1:8000/api/booking/", {
    method: "GET",
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