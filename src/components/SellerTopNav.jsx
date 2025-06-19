// src/components/SellerTopNav.jsx
import React from "react";
import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SellerTopNav({ title = "Add a Product" }) {
  const { seller } = useAuth();

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ minWidth: 220 }}
            aria-label="Search"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <button
          className="relative p-2 rounded-full hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={22} className="text-gray-500" />
          {/* Notification badge example */}
          {/* <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs px-1">3</span> */}
        </button>
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <UserCircle size={28} className="text-gray-400" />
          <span className="font-medium text-gray-800">
            {seller?.businessName || "Your Shop Name"}
          </span>
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 20 20"
            className="text-gray-400"
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
