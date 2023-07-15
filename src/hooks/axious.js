import axios from "axios";
export const makeRequest = axios.create({
  baseURL: "https://venchfindsystemapi.onrender.com",
  withCredentials: true,
});

// intersepter
export const axiousePrive = axios.create({
  baseURL: "https://venchfindsystemapi.onrender.com",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
