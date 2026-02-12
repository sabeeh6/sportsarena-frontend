import axios from "axios";

console.log("Config Live API" , import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // agar cookies / auth hain
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
