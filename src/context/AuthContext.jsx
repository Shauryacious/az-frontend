// Seller : src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProfile, logout as apiLogout } from "../api";
import { fetchSellerProfile } from "../api/sellerApi";
import { CLIENT_TYPE } from "../constants/clientType";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user and seller profile on mount
  useEffect(() => {
    refreshUserAndSeller();
    // eslint-disable-next-line
  }, []);

  // Refetch user profile and update state
  const refreshUser = async () => {
    try {
      const res = await fetchProfile(CLIENT_TYPE);
      setUser(res.data.user);
      // Only fetch seller profile if user is a seller
      if (res.data.user?.role === "seller") {
        try {
          const sellerRes = await fetchSellerProfile(CLIENT_TYPE);
          setSeller(sellerRes.data.seller);
        } catch {
          setSeller(null);
        }
      } else {
        setSeller(null);
      }
    } catch {
      setUser(null);
      setSeller(null);
    }
  };

  // Refetch seller profile and update state
  const refreshSeller = async () => {
    if (user?.role !== "seller") {
      setSeller(null);
      return;
    }
    try {
      const sellerRes = await fetchSellerProfile(CLIENT_TYPE);
      setSeller(sellerRes.data.seller);
    } catch {
      setSeller(null);
    }
  };

  // Fetch both user and seller
  const refreshUserAndSeller = async () => {
    setLoading(true);
    try {
      const res = await fetchProfile(CLIENT_TYPE);
      setUser(res.data.user);
      if (res.data.user?.role === "seller") {
        try {
          const sellerRes = await fetchSellerProfile(CLIENT_TYPE);
          setSeller(sellerRes.data.seller);
        } catch {
          setSeller(null);
        }
      } else {
        setSeller(null);
      }
    } catch {
      setUser(null);
      setSeller(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiLogout(CLIENT_TYPE);
    setUser(null);
    setSeller(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        seller,
        setSeller,
        loading,
        logout,
        refreshUser,
        refreshSeller,
        refreshUserAndSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
