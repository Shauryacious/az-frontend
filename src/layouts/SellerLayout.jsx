// src/layouts/SellerLayout.jsx
import React, { useState } from "react";
import SellerSidebar from "../components/SellerSidebar";
import SellerTopNav from "../components/SellerTopNav";
import { Outlet } from "react-router-dom";

export default function SellerLayout({ title = "", shopName = "" }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      <SellerSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <SellerTopNav title={title} shopName={shopName} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
