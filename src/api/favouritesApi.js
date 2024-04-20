// favourites.Api

import axios from "axios";

const BASE_URL = "https://cors-anywhere.herokuapp.com/661d0b3fe7b95ad7fa6bf345.mockapi.io/adventura/api/v1/";

export const favouritesApi = axios.create({ baseURL: BASE_URL });
