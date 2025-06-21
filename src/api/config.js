// src/api/config.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Always send credentials (cookies) with requests
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default apiClient;
