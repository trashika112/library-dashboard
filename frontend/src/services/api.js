// src/services/api.js
import axios from "axios";

// ✅ Use local backend in development, deployed backend in production
const BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

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
