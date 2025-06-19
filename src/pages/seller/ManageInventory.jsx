// src/pages/seller/ManageInventory.jsx
import React, { useEffect, useState } from "react";
import { fetchMyProducts } from "../../api/productApi";
import { MoreVertical } from "lucide-react";

function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide
        ${isActive ? "bg-[#e6f5ea] text-[#1a7f37]" : "bg-[#fbeaea] text-[#c00]"}
        border ${isActive ? "border-[#b2e2c7]" : "border-[#f5cccc]"}
      `}
      style={{ minWidth: 68, justifyContent: "center" }}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function ProductImage({ src, alt, fallback }) {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs text-gray-400">{fallback}</span>
      )}
    </div>
  );
}

export default function ManageInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetchMyProducts()
      .then((res) => setProducts(res.data.products || []))
      .finally(() => setLoading(false));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / pageSize);
  const paginated = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center bg-[#f4f6f8] py-10">
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2">
            <button
              className="bg-[#f7fafc] border border-gray-200 px-5 py-2 rounded-md font-semibold shadow-sm hover:bg-[#f2f7fd] transition"
              onClick={() =>
                (window.location.href = "/seller/catalog/add-product")
              }
            >
              + Add a Product
            </button>
            <div className="relative">
              <button className="bg-[#f7fafc] border border-gray-200 px-5 py-2 rounded-md font-semibold shadow-sm hover:bg-[#f2f7fd] transition flex items-center gap-2">
                Bulk Actions
                <svg
                  width="13"
                  height="13"
                  className="ml-1"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {/* Bulk actions dropdown can go here */}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-gray-200 px-5 py-2 rounded-md font-semibold shadow-sm hover:bg-gray-100 transition">
              Preferences
            </button>
            <button className="bg-[#232f3e] text-white px-5 py-2 rounded-md font-semibold shadow-sm hover:bg-[#314156] transition">
              View Selling Applications
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#f7fafc]">
                <tr className="border-b border-gray-100 text-gray-600 uppercase text-xs tracking-widest">
                  <th className="px-4 py-3 font-bold">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Image</th>
                  <th className="px-4 py-3 font-bold">SKU</th>
                  <th className="px-4 py-3 font-bold">Product Name</th>
                  <th className="px-4 py-3 font-bold">Date Created</th>
                  <th className="px-4 py-3 font-bold">Available</th>
                  <th className="px-4 py-3 font-bold text-right">Price</th>
                  <th className="px-4 py-3 font-bold text-right">
                    Sales (30D)
                  </th>
                  <th className="px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="py-12 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="py-12 text-center text-gray-400"
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((product, idx) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-100 hover:bg-[#f2f7fd] transition group"
                    >
                      <td className="px-4 py-3">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          status={
                            product.status ||
                            (product.stock > 0 ? "Active" : "Inactive")
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <ProductImage
                          src={product.images?.[0]}
                          alt={product.name}
                          fallback={`No Image`}
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {product.sku}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{product.stock}</td>
                      <td className="px-4 py-3 font-semibold text-right">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-right">
                        {/* Placeholder for 30D sales, replace with real data if available */}
                        {product.sales30d
                          ? `$${Number(product.sales30d).toFixed(2)}`
                          : "--"}
                      </td>
                      <td className="px-4 py-3">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-5 border-t border-gray-100 bg-[#f7fafc]">
            <div className="text-sm text-gray-600">
              Showing {products.length === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, products.length)} of {products.length}{" "}
              results
            </div>
            <div className="flex gap-1">
              <button
                className={`px-3 py-1 rounded ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border hover:bg-gray-50"
                }`}
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded font-semibold ${
                    page === i + 1
                      ? "bg-[#232f3e] text-white"
                      : "bg-white border hover:bg-gray-50"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={`px-3 py-1 rounded ${
                  page === totalPages || totalPages === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border hover:bg-gray-50"
                }`}
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-3 text-right">
          &copy; {new Date().getFullYear()} Amazon Seller Platform UI (Inspired)
        </div>
      </div>
    </div>
  );
}
