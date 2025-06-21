// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createSeller } from "../api/sellerApi";
import { CLIENT_TYPE } from "../constants/clientType";

export default function ProfilePage() {
  const { user, seller, loading, logout, refreshSeller } = useAuth();
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in.</div>;

  // Seller profile view
  if (seller) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Seller Profile</h2>
        <div className="mb-4">
          <strong>Business Name:</strong> {seller.businessName}
        </div>
        <div className="mb-4">
          <strong>Contact Email:</strong> {seller.contactEmail}
        </div>
        <button
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={async () => {
            await logout(CLIENT_TYPE);
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // User profile view with Become a Seller option
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <strong>Name:</strong> {user.name || "N/A"}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {user.email}
      </div>
      <button
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => setShowSellerForm(true)}
      >
        Become a Seller
      </button>
      {showSellerForm && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            try {
              await createSeller(businessName, contactEmail, CLIENT_TYPE);
              await refreshSeller(CLIENT_TYPE);
              setShowSellerForm(false);
            } catch (err) {
              setError(
                err.response?.data?.error || "Failed to create seller profile"
              );
            }
          }}
          className="mt-4"
        >
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <input
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="mb-2 w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Contact Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="mb-2 w-full px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
      <button
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={async () => {
          await logout(CLIENT_TYPE);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
