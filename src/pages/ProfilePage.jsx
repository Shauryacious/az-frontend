import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // or navigate("/") for home
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Seller Profile</h2>
      <div className="mb-4">
        <strong>Name:</strong> {user.name || "N/A"}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {user.email}
      </div>
      {/* Add more profile fields as needed */}
      <button
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
