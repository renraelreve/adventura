import axios from "axios";

const BASE_URL = "https://api.stb.gov.sg/media/download/v2/";
const API_KEY = "975ivVHndGmIa8IprCIzAq1EGuGAKEqf"; //

const imageAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    ApiEndPointTitle: "Download Media File",
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  },
});

export default imageAPI;
