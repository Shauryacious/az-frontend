// src/api/productApi.js
import apiClient from "./config";
import { CLIENT_TYPE } from "../constants/clientType";

// productData MUST be a FormData object for file upload
export const createProduct = (formData) =>
    apiClient.post("/api/products/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-client-type": CLIENT_TYPE
        }
    });

export const fetchMyProducts = () =>
    apiClient.get("/api/products/mine", {
        headers: {
            "x-client-type": CLIENT_TYPE
        }
    });
