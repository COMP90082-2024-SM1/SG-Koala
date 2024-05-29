const baseUrl = process.env.REACT_APP_BASEURL + "template/";

export const getAllTemplates = async () => {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      credentials: "include",
    });
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

export const getTemplateById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}${id}/`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching template with ID ${id}:`, error);
    throw error;
  }
};

export const createTemplate = async (templateData) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
};

export const updateTemplate = async (id, templateData) => {
  try {
    const response = await fetch(`${baseUrl}${id}/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating template with ID ${id}:`, error);
    throw error;
  }
};

export const deleteTemplate = async (id) => {
  try {
    const response = await fetch(`${baseUrl}${id}/`, {
      method: "DELETE",
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting template with ID ${id}:`, error);
    throw error;
  }
};
