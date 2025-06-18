import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import amazonLogo from "../assets/amazon-logo.svg";

export default function MainNavHeader() {
  return (
    <nav
      className="w-full flex items-center justify-between px-8 py-3 bg-white border-b border-gray-100 sticky top-0 z-40"
      style={{ marginTop: "40px" }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src={amazonLogo}
            alt="Amazon Logo"
            className="h-8 w-auto"
            style={{ minWidth: 100 }}
          />
        </Link>
      </div>
      {/* Nav links */}
      <div className="flex items-center gap-8">
        <div className="flex gap-6 font-semibold text-black">
          <button className="hover:text-[#FF9900] transition">
            Start <span className="ml-1">▼</span>
          </button>
          <button className="hover:text-[#FF9900] transition">
            Grow <span className="ml-1">▼</span>
          </button>
          <button className="hover:text-[#FF9900] transition">
            Pricing <span className="ml-1">▼</span>
          </button>
          <button className="hover:text-[#FF9900] transition">
            Resources <span className="ml-1">▼</span>
          </button>
        </div>
      </div>
      {/* CTA + Search */}
      <div className="flex items-center gap-4">
        <Link
          to="/sell"
          className="bg-[#FF9900] hover:bg-[#ffb84d] text-black font-bold py-2 px-6 rounded-full shadow transition"
        >
          Start Selling
        </Link>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Search className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </nav>
  );
}
