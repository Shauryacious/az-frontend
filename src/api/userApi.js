// src/api/userApi.js

import apiClient from "./config";

export const signup = (email, password) =>
    apiClient.post("/api/users/signup", { email, password });

export const login = (email, password) =>
    apiClient.post("/api/users/login", { email, password });

export const logout = () =>
    apiClient.post("/api/users/logout");

export const fetchProfile = () =>
    apiClient.get("/api/users/profile");
