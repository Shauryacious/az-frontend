// src/layouts/MainLayout.jsx
import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout({ theme, setTheme }) {
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Outlet />
    </>
  );
}
