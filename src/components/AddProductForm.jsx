import React, { useState } from "react";
import { createProduct } from "../api/productApi";

export default function AddProductForm({ onSuccess }) {
  const [fields, setFields] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    quantity: "",
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((img) => formData.append("images", img));

    try {
      await createProduct(formData);
      setLoading(false);
      if (onSuccess) onSuccess();
      setFields({
        title: "",
        description: "",
        brand: "",
        price: "",
        quantity: "",
      });
      setImages([]);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create product");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full border px-3 py-2 rounded"
        value={fields.title}
        onChange={handleFieldChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full border px-3 py-2 rounded"
        value={fields.description}
        onChange={handleFieldChange}
        required
      />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        className="w-full border px-3 py-2 rounded"
        value={fields.brand}
        onChange={handleFieldChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="w-full border px-3 py-2 rounded"
        value={fields.price}
        onChange={handleFieldChange}
        required
        min={0}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        className="w-full border px-3 py-2 rounded"
        value={fields.quantity}
        onChange={handleFieldChange}
        required
        min={0}
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="w-full"
      />
      <button
        type="submit"
        className="w-full bg-[#FF9900] text-white py-2 rounded hover:bg-[#e68a00]"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Create Product"}
      </button>
    </form>
  );
}
