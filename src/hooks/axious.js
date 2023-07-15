import axios from "axios";
export const makeRequest = axios.create({
  baseURL: "https://venchfindsystem-1l9s.onrender.com/api",
  withCredentials: true,
});

// intersepter
export const axiousePrive = axios.create({
  baseURL: "https://venchfindsystem-1l9s.onrender.com/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
