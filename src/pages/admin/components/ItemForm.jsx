import React, { useState, useEffect } from "react";

const ItemForm = ({ onSubmit, onClose, existingItem }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (existingItem) {
      setItemName(existingItem.name);
      setDescription(existingItem.description);
    } else {
      setItemName("");
      setDescription("");
    }
  }, [existingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ item_name: itemName, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-2">
        {existingItem ? "Edit Item" : "Create Item"}
      </h2>
      <div>
        <label className="block font-medium mb-1">Item Name</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
        >
          {existingItem ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
