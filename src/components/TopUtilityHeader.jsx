// src/components/TopUtilityHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import useScrollDirection from "../hooks/useScrollDirection";
import { useAuth } from "../context/AuthContext";

export default function TopUtilityHeader() {
  const scrollDirection = useScrollDirection();
  const { user, seller, loading } = useAuth();

  return (
    <div
      className={`w-full bg-[#f6f6f3] flex justify-end items-center px-8 py-1 text-sm font-semibold text-black transition-transform duration-300
        ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}
      `}
      style={{ zIndex: 50, position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <div className="flex gap-6 items-center">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
            <path
              fill="#222"
              d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm1 17.93V19h-2v.93A8.001 8.001 0 0 1 4.07 13H5v-2h-.93A8.001 8.001 0 0 1 11 4.07V5h2V4.07A8.001 8.001 0 0 1 19.93 11H19v2h.93A8.001 8.001 0 0 1 13 19.93ZM12 6a6 6 0 1 1 0 12A6 6 0 0 1 12 6Z"
            ></path>
          </svg>
          English
        </span>
        {!loading && user && (
          <Link
            to="/profile"
            className="flex items-center gap-1 hover:underline"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" fill="#222" />
              <path
                d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                stroke="#222"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {seller ? seller.businessName || "Seller" : user.name || user.email}
          </Link>
        )}
      </div>
    </div>
  );
}
