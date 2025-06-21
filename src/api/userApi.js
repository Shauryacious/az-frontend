// src/api/userApi.js

import apiClient from "./config";

// Accept businessName and contactEmail for seller signup
export const signup = (email, password, clientType, businessName, contactEmail) =>
    apiClient.post(
        "/api/users/signup",
        { email, password, businessName, contactEmail },
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

// For logout and profile, always send x-client-type
export const logout = (clientType) =>
    apiClient.post(
        "/api/users/logout",
        {},
        {
            headers: {
                "x-client-type": clientType
            }
        }
    );

export const fetchProfile = (clientType) =>
    apiClient.get(
        "/api/users/profile",
        {
            headers: {
                "x-client-type": clientType
            }
        }
    );
