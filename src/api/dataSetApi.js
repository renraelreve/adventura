import axios from "axios";

const BASE_URL = "https://api.stb.gov.sg/content/common/v2";
const API_KEY = "975ivVHndGmIa8IprCIzAq1EGuGAKEqf"; //

const dataSetAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    ApiEndPointTitle: "Search Multiple Datasets By Keyword",
    "Content-Type": "application/json",
    "X-Content-Language": "en",
    "X-API-Key": API_KEY,
  },
});

export default dataSetAPI;
