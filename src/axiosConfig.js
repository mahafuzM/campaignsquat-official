import axios from "axios";

// 🌐 Global API Base URL Setup
axios.defaults.baseURL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000" 
    : "";
    
// 🛡️ Global Axios Interceptor for Admin Auth Token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;