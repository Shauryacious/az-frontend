// src/api/sellerApi.js
import apiClient from "./config";

export const createSeller = (businessName, contactEmail) =>
    apiClient.post("/api/sellers/create", { businessName, contactEmail });

export const fetchSellerProfile = () =>
    apiClient.get("/api/sellers/me");
