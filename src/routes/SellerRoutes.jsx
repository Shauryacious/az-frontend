// src/routes/SellerRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SellerLayout from "../layouts/SellerLayout";
import AddProduct from "../pages/seller/AddProduct";
import SellerDashboard from "../pages/SellerDashboard";
import ManageInventory from "../pages/seller/ManageInventory";

export default function SellerRoutes() {
  return (
    <Routes>
      <Route
        element={
          <SellerLayout title="Seller Dashboard" shopName="Your Shop Name" />
        }
      >
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="catalog/add-product" element={<AddProduct />} />
        <Route path="inventory/manage" element={<ManageInventory />} />

        {/* ...other seller routes */}
      </Route>
    </Routes>
  );
}
