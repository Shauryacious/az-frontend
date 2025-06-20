// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";
import { useAuth } from "../context/AuthContext";

// Set the client type for this frontend
// Change this to "consumer-frontend" or "beacon-frontend" for other frontends
const CLIENT_TYPE = "seller-frontend";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Pass client type for automatic role assignment
      await signup(email, password, CLIENT_TYPE);
      await refreshUser(); // Immediately update user state in context
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <form
        className="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#FF9900] text-white py-2 rounded hover:bg-[#e68a00]"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-[#FF9900] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}
