import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";


export const fetchAnimeByGenreService = async (genre, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime`, {
      params: {
        q: genre,
        order_by: "score",
        sort: "desc",
        limit: 20,
        page: page
      }
    });

    return response.data.data;

  } catch (error) {
    console.error("Jikan API Error:", error.message);
    throw new Error("Failed to fetch anime");
  }
};



export const searchAnimeService = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime`, {
      params: {
        q: query,
        limit: 10
      }
    });

    return response.data.data;

  } catch (error) {
    console.error("Search Error:", error.message);
    throw new Error("Failed to search anime");
  }
};



export const getAnimeDetailsService = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime/${id}`);
    return response.data.data;

  } catch (error) {
    console.error("Details Error:", error.message);
    throw new Error("Failed to fetch anime details");
  }
};