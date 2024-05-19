const baseUrl = process.env.REACT_APP_BASEURL;

export const getAllTemplates = async () => {
  return fetch(baseUrl + "template/").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
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

export const getAllSchool = async () => {
  return fetch(baseUrl + "school/").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const createNewBooking = async (bookingData) => {
  return fetch(baseUrl + "booking/", {
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
  return fetch(baseUrl + "school/", {
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
  return fetch(baseUrl + `checklist/${id}/`, {
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
    const response = await fetch(baseUrl + `checklist/${id}/`, {
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
    const response = await fetch(baseUrl + `booking/${id}/`);
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
    const response = await fetch(baseUrl + `school/${id}/`);
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
  return fetch(baseUrl + `checklist/${id}/`).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const getAllBooking = async () => {
  return fetch(baseUrl + "booking/", {
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

export const updateMiscellaneous = async (newOptions) => {
  console.log('Sending data:', newOptions); 
  try {
    const response = await fetch('http://127.0.0.1:8000/api/miscellaneous/', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOptions),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Successfully updated:', data);
  } catch (error) {
    console.error('Error updating miscellaneous data:', error);
  }
};

export const updateBooking = async (id,bookingData) => {
  return fetch(`http://127.0.0.1:8000/api/booking/${id}/`, {
    method: "PUT",
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


export const updateSchoolById = async (id,school) => {
  return fetch(`http://127.0.0.1:8000/api/school/${id}/`, {
    method: "PUT",
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
  return fetch(`http://127.0.0.1:8000/api/school/${id}/`, {
    method: "DELETE",
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
  return fetch(`http://127.0.0.1:8000/api/checklist/${id}/`, {
    method: "DELETE",
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

export const deleteBooking = async (id,bookingData) => {
  return fetch(`http://127.0.0.1:8000/api/booking/${id}/`, {
    method: "DELETE",
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

