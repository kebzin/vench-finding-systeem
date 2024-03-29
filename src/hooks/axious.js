import axios from "axios";

export const makeRequest = axios.create({
  // baseURL: process.env.VENCH_FINDINGsYSTEM_APL_URL,
  // baseURL: process.env.VENCH_FINFDING_SYSTEM_LOCALHOST_API_URL,
  baseURL: "https://venchfindsystemapi.onrender.com/api",
  //baseURL: "http://localhost:3009/api",
  withCredentials: true,
});

console.log(process.env.VENCH_FINFDING_SYSTEM_LOCALHOST_API_URL);

// intersepter
export const axiousePrive = axios.create({
  baseURL: "https://venchfindsystemapi.onrender.com/api",
  //baseURL: "http://localhost:3009/api",
  // baseURL: process.env.VENCH_FINFDING_SYSTEM_LOCALHOST_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
