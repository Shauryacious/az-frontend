// src/components/RequireSeller.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireSeller({ children }) {
  const { seller, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!seller) return <Navigate to="/profile" replace />;
  return children;
}
