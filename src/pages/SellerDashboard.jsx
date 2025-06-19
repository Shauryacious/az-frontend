import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchSellerProfile } from "../api/sellerApi";
import { createProduct, fetchMyProducts } from "../api/productApi";

export default function SellerDashboard() {
  const { seller, user, refreshSeller } = useAuth();
  const [loading, setLoading] = useState(!seller);
  const [error, setError] = useState("");

  // Add Product Modal State
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    quantity: "",
    images: [],
  });
  const [uploadError, setUploadError] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  // View Products Modal State
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");

  // Optionally re-fetch seller profile on mount for fresh data
  useEffect(() => {
    if (!seller) {
      setLoading(true);
      fetchSellerProfile()
        .then(() => {
          refreshSeller();
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load seller profile.");
          setLoading(false);
        });
    }
  }, [seller, refreshSeller]);

  // Handlers for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProductData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  // Product submission handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setUploadError("");
    setUploadLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("brand", productData.brand);
      formData.append("price", productData.price);
      formData.append("quantity", productData.quantity);
      productData.images.forEach((img) => formData.append("images", img));

      await createProduct(formData);
      setUploadLoading(false);
      setShowAddProductForm(false);
      setProductData({
        title: "",
        description: "",
        brand: "",
        price: "",
        quantity: "",
        images: [],
      });
      refreshSeller();
    } catch (err) {
      setUploadError(err.response?.data?.error || "Failed to add product.");
      setUploadLoading(false);
    }
  };

  // Fetch products when opening modal
  const handleViewProducts = async () => {
    setProductsLoading(true);
    setProductsError("");
    setShowProductsModal(true);
    try {
      const res = await fetchMyProducts();
      setProducts(res.data.products);
      setProductsLoading(false);
    } catch (err) {
      setProductsError("Failed to load products.");
      setProductsLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!seller)
    return <div className="p-8 text-center">No seller profile found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-[#FF9900]">
        Seller Dashboard
      </h1>
      <div className="mb-4">
        <strong>Business Name:</strong> {seller.businessName}
      </div>
      <div className="mb-4">
        <strong>Contact Email:</strong> {seller.contactEmail}
      </div>
      <div className="mb-4">
        <strong>Seller Since:</strong>{" "}
        {new Date(seller.createdAt).toLocaleDateString()}
      </div>
      <div className="mb-6">
        <strong>Linked User Account:</strong> {user?.email}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            className="bg-[#FF9900] text-black px-4 py-2 rounded shadow hover:bg-[#ffb84d] font-semibold"
            onClick={() => setShowAddProductForm(true)}
          >
            Add New Product
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 font-semibold"
            onClick={handleViewProducts}
          >
            View Products
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 font-semibold"
            // onClick={() => ...}
          >
            View Orders
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={() => setShowAddProductForm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#FF9900]">
              Add New Product
            </h2>
            {uploadError && (
              <div className="mb-4 text-red-600">{uploadError}</div>
            )}
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={productData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={productData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={productData.brand}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/4">
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={productData.price}
                    onChange={handleInputChange}
                    required
                    min={0}
                    step="0.01"
                  />
                </div>
                <div className="w-1/4">
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={productData.quantity}
                    onChange={handleInputChange}
                    required
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                disabled={uploadLoading}
                className="w-full bg-[#FF9900] text-white py-2 rounded hover:bg-[#e68a00] font-semibold disabled:opacity-50"
              >
                {uploadLoading ? "Uploading..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Products Modal */}
      {showProductsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={() => setShowProductsModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Your Products
            </h2>
            {productsLoading && <div>Loading products...</div>}
            {productsError && (
              <div className="text-red-600 mb-4">{productsError}</div>
            )}
            {!productsLoading && products.length === 0 && (
              <div className="text-gray-500">No products found.</div>
            )}
            {!productsLoading && products.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border rounded p-4 flex flex-col gap-2 shadow-sm bg-gray-50"
                  >
                    <div className="flex gap-2 overflow-x-auto">
                      {product.images && product.images.length > 0 ? (
                        product.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={product.title}
                            className="h-20 w-20 object-cover rounded border"
                          />
                        ))
                      ) : (
                        <div className="text-gray-400 italic">No image</div>
                      )}
                    </div>
                    <div className="font-bold text-lg">{product.title}</div>
                    <div className="text-gray-700">{product.description}</div>
                    <div className="text-sm text-gray-600">
                      Brand: {product.brand || "N/A"}
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>
                        Price: <strong>${product.price}</strong>
                      </span>
                      <span>
                        Qty: <strong>{product.quantity}</strong>
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Listed on:{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
