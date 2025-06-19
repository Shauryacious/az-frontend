// src/pages/seller/AddProduct.jsx
import React, { useState } from "react";
import { UploadCloud, Bell, UserCircle } from "lucide-react";

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 10;

export default function AddProduct({ navigateTo }) {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    available: "",
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];
    let error = null;

    if (files.length + images.length > MAX_IMAGES) {
      error = `You can upload up to ${MAX_IMAGES} images.`;
    } else {
      for (const file of files) {
        if (
          !["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
            file.type
          )
        ) {
          error = "Only PNG, JPG, and GIF files are allowed.";
          break;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          error = `Each image must be less than ${MAX_SIZE_MB}MB.`;
          break;
        }
        validFiles.push(file);
      }
    }

    if (error) {
      setErrors((prev) => ({ ...prev, images: error }));
    } else {
      setErrors((prev) => ({ ...prev, images: undefined }));
      setImages((prev) => [...prev, ...validFiles]);
    }
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange({ target: { files: e.dataTransfer.files } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const newErrors = {};
    if (!product.name) newErrors.name = "Product name is required.";
    if (!product.sku) newErrors.sku = "SKU is required.";
    if (!product.description)
      newErrors.description = "Description is required.";
    if (!product.price || Number(product.price) <= 0)
      newErrors.price = "Price must be positive.";
    if (product.available === "" || Number(product.available) < 0)
      newErrors.available = "Available quantity is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    // Prepare FormData for backend API
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("sku", product.sku);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("available", product.available);
    images.forEach((file) => formData.append("images", file));

    try {
      // Replace with your API call, e.g. await createProduct(formData);
      setProduct({
        name: "",
        sku: "",
        description: "",
        price: "",
        available: "",
      });
      setImages([]);
      setTimeout(() => navigateTo("productList"), 1200);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: err.response?.data?.error || "Failed to add product.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Add a Product</h1>
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
          </button>
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <UserCircle size={28} className="text-gray-400" />
            <span className="font-medium text-gray-800">Your Shop Name</span>
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

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8 p-8 max-w-6xl mx-auto">
        {/* Product Information */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Product Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleChange}
                required
                aria-label="Product Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="sku"
                className="block text-sm font-medium text-gray-700"
              >
                SKU
              </label>
              <input
                type="text"
                name="sku"
                id="sku"
                value={product.sku}
                onChange={handleChange}
                required
                aria-label="SKU"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                value={product.description}
                onChange={handleChange}
                required
                aria-label="Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Offer */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                  min="0.01"
                  step="0.01"
                  aria-label="Price"
                  className="block w-full pl-7 pr-12 sm:text-sm border border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="available"
                className="block text-sm font-medium text-gray-700"
              >
                Available Quantity
              </label>
              <input
                type="number"
                name="available"
                id="available"
                value={product.available}
                onChange={handleChange}
                required
                min="0"
                aria-label="Available Quantity"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
          <div
            className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/gif"
                    multiple
                    className="sr-only"
                    onChange={handleImageChange}
                    disabled={images.length >= MAX_IMAGES}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3 justify-center">
                {images.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      className="h-16 w-16 object-cover rounded border"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleRemoveImage(idx)}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <div className="text-xs text-red-500 mt-2">{errors.images}</div>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigateTo("productList")}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
            disabled={submitting}
            aria-disabled={submitting}
          >
            {submitting ? "Saving..." : "Save and finish"}
          </button>
        </div>
        {errors.submit && (
          <div className="text-red-600 text-sm mt-2">{errors.submit}</div>
        )}
      </form>
    </div>
  );
}
