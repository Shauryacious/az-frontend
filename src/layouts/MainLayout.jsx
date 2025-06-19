// src/layouts/MainLayout.jsx
import React from "react";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout({ theme, setTheme }) {
  const location = useLocation();

  // Hide Header on any seller dashboard route
  const hideHeader = location.pathname.startsWith("/seller");

  return (
    <>
      {!hideHeader && <Header theme={theme} setTheme={setTheme} />}
      <Outlet />
    </>
  );
}
