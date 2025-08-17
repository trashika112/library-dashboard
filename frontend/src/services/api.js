// src/services/api.js
import axios from "axios";

// ✅ Use the deployed backend with /api prefix
const BASE = process.env.REACT_APP_API_BASE || "https://library-dashboard-5.onrender.com/api";

const api = axios.create({
  baseURL: BASE,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
