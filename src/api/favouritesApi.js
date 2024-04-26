// favourites.Api

import axios from "axios";

const BASE_URL =
  "https://661d0b3fe7b95ad7fa6bf345.mockapi.io/adventura/api/v1/";

// remember to request access from https://cors-anywhere.herokuapp.com/corsdemo to prevent CORS error
// const BASE_URL = "https://661d0b3fe7b95ad7fa6bf345.mockapi.io/adventura/api/v1/";

export const favouritesApi = axios.create({ baseURL: BASE_URL });
