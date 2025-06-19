// src/api/productApi.js
import apiClient from "./config";

// productData MUST be a FormData object for file upload
export const createProduct = (formData) =>
    apiClient.post("/api/products/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const fetchMyProducts = () =>
    apiClient.get("/api/products/mine");

