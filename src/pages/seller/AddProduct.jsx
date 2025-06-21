// src/pages/seller/AddProduct.jsx
import React, { useState } from "react";
import { createProduct } from "../../api/productApi";
import { UploadCloud } from "lucide-react";

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 10;

export default function AddProduct({ navigateTo }) {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    stock: "", // <-- changed from available to stock
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];
    let error = null;

    // Validate number and size of images
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

  // Remove selected image
  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setSuccess(null);

    // Basic client validation
    const newErrors = {};
    if (!product.name) newErrors.name = "Product name is required.";
    if (!product.sku) newErrors.sku = "SKU is required.";
    if (!product.description)
      newErrors.description = "Description is required.";
    if (!product.price || Number(product.price) <= 0)
      newErrors.price = "Price must be positive.";
    if (product.stock === "" || Number(product.stock) < 0)
      newErrors.stock = "Stock is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("sku", product.sku);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock); // <-- changed from available to stock
    images.forEach((file) => formData.append("images", file));

    try {
      await createProduct(formData);
      setSuccess("Product added successfully!");
      setProduct({
        name: "",
        sku: "",
        description: "",
        price: "",
        stock: "", // <-- changed from available to stock
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

  // Drag-and-drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange({ target: { files: e.dataTransfer.files } });
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center bg-[#f4f6f8] py-10">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#232f3e] tracking-tight mb-1">
            Add a Product
          </h1>
          <div className="text-sm text-gray-500">
            Enter product details to add a new listing to your Amazon catalog.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Information */}
          <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
            <h2 className="text-lg font-semibold text-[#232f3e] mb-4">
              Product Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-widest"
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
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#232f3e] focus:border-[#232f3e] sm:text-sm`}
                />
                {errors.name && (
                  <div className="text-xs text-red-500 mt-1">{errors.name}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="sku"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-widest"
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
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.sku ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#232f3e] focus:border-[#232f3e] sm:text-sm`}
                />
                {errors.sku && (
                  <div className="text-xs text-red-500 mt-1">{errors.sku}</div>
                )}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-widest"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  value={product.description}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#232f3e] focus:border-[#232f3e] sm:text-sm`}
                ></textarea>
                {errors.description && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.description}
                  </div>
                )}
              </div>
            </div>
          </section>
          {/* Offer */}
          <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
            <h2 className="text-lg font-semibold text-[#232f3e] mb-4">Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-widest"
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
                    className={`block w-full pl-7 pr-12 sm:text-sm border ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#232f3e] focus:border-[#232f3e]`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.price}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-widest"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#232f3e] focus:border-[#232f3e] sm:text-sm`}
                />
                {errors.stock && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.stock}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white p-8 rounded-2xl shadow border border-gray-100">
            <h2 className="text-lg font-semibold text-[#232f3e] mb-4">
              Images
            </h2>
            <div
              className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl bg-[#fafbfc]"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-[#b2bcca]" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#146eb4] hover:text-[#232f3e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#232f3e]"
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
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB, max {MAX_IMAGES} images
                </p>
                {errors.images && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.images}
                  </div>
                )}
              </div>
              {/* Preview selected images */}
              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3 justify-center">
                  {images.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${idx + 1}`}
                        className="h-16 w-16 object-cover rounded border border-gray-200"
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
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigateTo("productList")}
              className="px-8 py-2 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-50 transition"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#232f3e] hover:bg-[#314156] transition disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save and finish"}
            </button>
          </div>
          {/* Success/Error messages */}
          {success && (
            <div className="text-green-600 text-sm mt-2">{success}</div>
          )}
          {errors.submit && (
            <div className="text-red-600 text-sm mt-2">{errors.submit}</div>
          )}
        </form>
      </div>
    </div>
  );
}
