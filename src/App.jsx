import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import SellerDashboard from "./pages/SellerDashboard"; // Seller page
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RequireSeller from "./components/RequireSeller";

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout theme={theme} setTheme={setTheme} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller/dashboard"
              element={
                <RequireSeller>
                  <SellerDashboard />
                </RequireSeller>
              }
            />
            {/* Add more routes here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
