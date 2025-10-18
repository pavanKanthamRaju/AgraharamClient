import React, { useState, useEffect } from "react";
import uploadToCloudinary from "../../../utils/cloudinaryUpload";

const ItemForm = ({ item, poojas, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    pooja_id: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        price: item.price || "",
        description: item.description || "",
        pooja_id: item.pooja_id || "",
        image: item.image || null,
      });
      setPreview(item.image || null);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.image;

    // ✅ Upload to Cloudinary only if it's a file
    if (formData.image && formData.image instanceof File) {
      try {
        imageUrl = await uploadToCloudinary(formData.image);
      } catch (err) {
        console.error("Image upload failed:", err);
        return;
      }
    }

    const finalData = {
      ...formData,
      image: imageUrl ? imageUrl : preview, // fallback if image not updated
    };

    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 md:mx-0 my-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {item ? "Edit Item" : "Add New Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg font-semibold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter item name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Pooja Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Pooja
            </label>
            <select
              name="pooja_id"
              value={formData.pooja_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Pooja</option>
              {poojas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write a short description..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              rows="3"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image
            </label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition ${
                preview
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              {preview ? (
                <div className="w-full text-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="rounded-lg object-cover w-full h-40 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setFormData((prev) => ({ ...prev, image: null }));
                    }}
                    className="mt-3 text-sm text-red-600 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="w-12 h-12 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm mb-1">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {item ? "Update Item" : "Create Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
