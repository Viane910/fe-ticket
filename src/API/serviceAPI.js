import axios from "axios";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "http://10.1.1.141:3000";

const api = axios.create({
  baseURL: API_URL,
});

// 🔐 auto kirim token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
