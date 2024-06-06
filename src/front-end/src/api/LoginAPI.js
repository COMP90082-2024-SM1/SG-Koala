const baseUrl = process.env.REACT_APP_BASEURL + "login/";

export const LoginDetail = async (username, password) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid Username or Password");
      } else if (response.status === 400) {
        throw new Error("Missing Username or Password");
      } else {
        throw new Error("Network response was not ok");
      }
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching login detail:", error);
    throw error;
  }
};
