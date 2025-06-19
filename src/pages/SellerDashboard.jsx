import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchSellerProfile } from "../api/sellerApi";

export default function SellerDashboard() {
  const { seller, user, refreshSeller } = useAuth();
  const [loading, setLoading] = useState(!seller);
  const [error, setError] = useState("");

  // Optionally re-fetch seller profile on mount for fresh data
  useEffect(() => {
    if (!seller) {
      setLoading(true);
      fetchSellerProfile()
        .then((res) => {
          refreshSeller(); // update context
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load seller profile.");
          setLoading(false);
        });
    }
  }, [seller, refreshSeller]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!seller)
    return <div className="p-8 text-center">No seller profile found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-[#FF9900]">
        Seller Dashboard
      </h1>
      <div className="mb-4">
        <strong>Business Name:</strong> {seller.businessName}
      </div>
      <div className="mb-4">
        <strong>Contact Email:</strong> {seller.contactEmail}
      </div>
      <div className="mb-4">
        <strong>Seller Since:</strong>{" "}
        {new Date(seller.createdAt).toLocaleDateString()}
      </div>
      <div className="mb-6">
        <strong>Linked User Account:</strong> {user?.email}
      </div>
      {/* Add more seller stats, recent orders, products, analytics, etc. here */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
        <div className="flex gap-4">
          <button
            className="bg-[#FF9900] text-black px-4 py-2 rounded shadow hover:bg-[#ffb84d] font-semibold"
            // onClick={() => ...}
          >
            Add New Product
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 font-semibold"
            // onClick={() => ...}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
