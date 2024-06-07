const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};

const storeTokens = (tokens) => {
  setCookie("authTokens", JSON.stringify(tokens), 7); // Store for 7 days
};

const getAuthToken = () => {
  const authTokenString = getCookie("authTokens");
  if (!authTokenString) {
    throw new Error("No auth token found. Please login.");
  }

  let authTokens;
  try {
    authTokens = JSON.parse(authTokenString);
  } catch (e) {
    throw new Error("Invalid auth token format. Please login again.");
  }

  if (!authTokens || !authTokens.access_token) {
    throw new Error("No valid auth token found. Please login.");
  }

  return authTokens.access_token;
};

export { setCookie, getCookie, deleteCookie, storeTokens, getAuthToken };
