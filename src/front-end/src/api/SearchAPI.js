const baseUrl = "http://127.0.0.1:8000/api/booking/search";

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
