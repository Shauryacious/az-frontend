// src/api/userApi.js

import apiClient from "./config";

// Accept clientType as an argument
export const signup = (email, password, clientType) =>
    apiClient.post(
        "/api/users/signup",
        { email, password },
        {
            headers: {
                "x-client-type": clientType
            }
        }
    );

export const login = (email, password, clientType) =>
    apiClient.post(
        "/api/users/login",
        { email, password },
        {
            headers: {
                "x-client-type": clientType
            }
        }
    );


export const logout = () =>
    apiClient.post("/api/users/logout");

export const fetchProfile = () =>
    apiClient.get("/api/users/profile");
