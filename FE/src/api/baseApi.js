import axios from "axios";

export const API_BASE_URL = "http://localhost:5007/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
