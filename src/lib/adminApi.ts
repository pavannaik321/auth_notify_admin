// lib/adminApi.ts
import axios from "axios";

const adminAPI = axios.create({
  baseURL: "http://localhost:5001/api", // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token if needed (if you add admin auth later)
export const setAdminToken = (token: string) => {
  adminAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default adminAPI;
