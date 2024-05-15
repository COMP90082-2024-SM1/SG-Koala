const baseUrl = process.env.REACT_APP_BASEURL + "booking/search";

export const getSearchResult = async (query) => {
  const encodedQuery = encodeURIComponent(query);
  const url = `${baseUrl}?query=${encodedQuery}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  });
};
