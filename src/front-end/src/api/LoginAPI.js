import { storeTokens } from "./Cookie";

const baseUrl = process.env.REACT_APP_BASEURL + "login/";

export const LoginDetail = async (username, password) => {
  console.log("Username:", username);
  console.log("Password:", password);

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const tokens = await response.json();
      storeTokens(tokens);
      console.log("Login successful. Tokens stored.");
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
