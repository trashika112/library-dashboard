// src/services/api.js
import axios from "axios";


const BASE = process.env.REACT_APP_API_BASE || "https://library-dashboard-6.onrender.com/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE,
});

// Function to set Authorization header for JWT token
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
