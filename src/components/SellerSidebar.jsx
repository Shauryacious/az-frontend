// src/components/SellerSidebar.jsx
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Layers,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Store,
  BarChart2,
  FileText,
  Users,
  Menu,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const sidebarConfig = [
  { label: "Dashboard", icon: <Star size={20} />, to: "/seller/dashboard" },
  {
    label: "Catalog",
    icon: <Layers size={20} />,
    subMenu: [
      { label: "Add Products", to: "/seller/catalog/add-product" },
      { label: "Complete Your Drafts", to: "/seller/catalog/drafts" },
      {
        label: "View Selling Applications",
        to: "/seller/catalog/applications",
      },
      {
        label: "Improve Listing Quality",
        to: "/seller/catalog/improve-listing",
      },
      { label: "Add Products via Upload", to: "/seller/catalog/upload" },
      { label: "Upload & Manage Videos", to: "/seller/catalog/videos" },
      { label: "Manage Product Documents", to: "/seller/catalog/documents" },
    ],
  },
  {
    label: "Inventory",
    icon: <Package size={20} />,
    subMenu: [
      { label: "Manage Inventory", to: "/seller/inventory/manage" },
      { label: "Manage FBA Inventory", to: "/seller/inventory/fba" },
      { label: "Inventory Planning", to: "/seller/inventory/planning" },
      { label: "Sell Globally", to: "/seller/inventory/global" },
      { label: "Manage PartFinder", to: "/seller/inventory/partfinder" },
      { label: "Manage FBA Shipments", to: "/seller/inventory/shipments" },
    ],
  },
  { label: "Pricing", icon: <DollarSign size={20} />, to: "/seller/pricing" },
  { label: "Orders", icon: <ShoppingCart size={20} />, to: "/seller/orders" },
  {
    label: "Advertising",
    icon: <TrendingUp size={20} />,
    to: "/seller/advertising",
  },
  { label: "Stores", icon: <Store size={20} />, to: "/seller/stores" },
  { label: "Growth", icon: <BarChart2 size={20} />, to: "/seller/growth" },
  { label: "Reports", icon: <FileText size={20} />, to: "/seller/reports" },
  {
    label: "Performance",
    icon: <Users size={20} />,
    to: "/seller/performance",
  },
];

export default function SellerSidebar({ isOpen, onToggle }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggleMenu = (idx) => {
    setOpenMenus((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const isActive = (to) => location.pathname.startsWith(to);

  return (
    <aside
      className={`bg-[#232f3e] text-white h-screen fixed top-0 left-0 z-40 flex flex-col shadow-lg transition-[width] duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center px-3 py-4 border-b border-[#314156]">
        <button
          className="p-2 rounded hover:bg-[#2a3a50] focus:outline-none"
          aria-label="Toggle sidebar"
          onClick={onToggle}
        >
          <Menu size={22} />
        </button>
        {isOpen && (
          <span className="ml-3 font-bold text-lg tracking-tight select-none">
            Seller Central
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {sidebarConfig.map((item, idx) => (
            <li key={item.label}>
              {item.subMenu && item.subMenu.length > 0 ? (
                <>
                  <button
                    className={`flex items-center w-full px-3 py-2 rounded-md text-left transition-colors duration-200 ${
                      openMenus[idx] ? "bg-[#28384a]" : "hover:bg-[#28384a]"
                    }`}
                    onClick={() => handleToggleMenu(idx)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isOpen && <span className="flex-1">{item.label}</span>}
                    {isOpen &&
                      (openMenus[idx] ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      ))}
                  </button>
                  {isOpen && openMenus[idx] && (
                    <ul className="ml-7 mt-1 space-y-1">
                      {item.subMenu.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            to={sub.to}
                            className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                              isActive(sub.to)
                                ? "bg-blue-600 text-white font-semibold"
                                : "text-gray-100 hover:bg-[#37517e]"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.to || "#"}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive(item.to)
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-100 hover:bg-[#28384a]"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isOpen && <span>{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`p-4 mt-auto text-xs text-gray-400 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        &copy; {new Date().getFullYear()} Seller Platform
      </div>
    </aside>
  );
}
