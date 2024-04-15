import axios from "axios";

const BASE_URL = "https://api.stb.gov.sg/content/attractions/v2/search";
const API_KEY = "975ivVHndGmIa8IprCIzAq1EGuGAKEqf"; //

const placeAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    ApiEndPointTitle: "Search Attractions By Keyword or UUIDs",
    "Content-Type": "application/json",
    "X-Content-Language": "en",
    "X-API-Key": API_KEY,
  },
});

export default placeAPI;
