import axios from "axios";
export const makeRequest = axios.create({
  baseURL: "http://localhost:3009/api",
  withCredentials: true,
});

// intersepter
export const axiousePrive = axios.create({
  baseURL: "http://localhost:3009/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
