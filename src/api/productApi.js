// src/api/productApi.js
import apiClient from "./config";

export const createProduct = (productData) =>
    apiClient.post("/api/products/create", productData);

export const fetchMyProducts = () =>
    apiClient.get("/api/products/mine");
