/* export const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.results || []);
 */
export const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.genres || data.results || []);
//data.results || [] jeśli data results nie istnieje zwróci pustą tablicę

export const fetcherSearch = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const error = new Error("Response Error");
      (error as any).status = response.status;
      throw error;
    }
    const data = await response.json();
    return {
      results: data.results || [],
      totalResults: data.total_results || 0,
      totalPages: data.total_pages || 0,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetcherMedia = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data || []);
