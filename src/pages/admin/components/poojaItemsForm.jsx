// // import React, { useState, useEffect } from "react";

// //  import { getPoojaItemsByid, getAllItems, addPoojaItem } from "../../../api/dashboardsApi";

// // const PoojaItemsForm = ({ pooja, onClose }) => {
// //   const [itemsList, setItemsList] = useState([]);
// //   const [poojaItems, setPoojaItems] = useState([]);

// //   useEffect(() => {
// //     fetchItems();
// //     fetchPoojaItems();
// //   }, [pooja]);

// //   const fetchItems = async () => {
// //      const data = await getAllItems();
// //     setItemsList(data.items);
// //   };

// //   const fetchPoojaItems = async () => {
// //      const data = await getPoojaItemsByid(pooja.id);
// //     setPoojaItems(data);
// //   };

// //   const handleAddItem = () => {
// //     setPoojaItems([...poojaItems, { item_id: "", quantity: 1, price: 0 }]);
// //   };

// //   const handleChange = (index, field, value) => {
// //     const updated = [...poojaItems];
// //     updated[index][field] = value;
// //     setPoojaItems(updated);
// //   };

// //   const handleSubmit = async () => {
// //     for (let item of poojaItems) {
// //       await addPoojaItem({
// //         pooja_id: pooja.id,
// //         item_id: item.item_id,
// //         quantity: item.quantity,
// //         price: item.price,
// //       });
// //     }
// //     onClose();
// //   };

// //   return (
// //     <div>
// //       <div className="space-y-2">
// //         {poojaItems.map((item, index) => (
// //           <div key={index} className="flex gap-2 items-center">
// //             <select
// //               className="border p-2 rounded flex-1"
// //               value={item.item_id}
// //               onChange={(e) => handleChange(index, "item_id", e.target.value)}
// //             >
// //               <option value="">Select Item</option>
// //               {itemsList.map((it) => (
// //                 <option key={it.id} value={it.id}>
// //                   {it.name}
// //                 </option>
// //               ))}
// //             </select>

// //             <input
// //               type="number"
// //               placeholder="Quantity"
// //               className="border p-2 rounded w-24"
// //               value={item.quantity}
// //               onChange={(e) => handleChange(index, "quantity", e.target.value)}
// //             />

// //             <input
// //               type="number"
// //               placeholder="Price"
// //               className="border p-2 rounded w-24"
// //               value={item.price}
// //               onChange={(e) => handleChange(index, "price", e.target.value)}
// //             />
// //           </div>
// //         ))}
// //       </div>

// //       <div className="flex justify-between mt-4">
// //         <button
// //           className="bg-gray-500 text-white px-4 py-2 rounded"
// //           onClick={onClose}
// //         >
// //           Cancel
// //         </button>
// //         <div className="flex gap-2">
// //           <button
// //             className="bg-blue-500 text-white px-4 py-2 rounded"
// //             onClick={handleAddItem}
// //           >
// //             Add Item
// //           </button>
// //           <button
// //             className="bg-green-500 text-white px-4 py-2 rounded"
// //             onClick={handleSubmit}
// //           >
// //             Save Items
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PoojaItemsForm;

// import React, { useState, useEffect } from "react";
// import {
//   getPoojaItemsByid,
//   getAllItems,
//   addPoojaItem,
//   deletePoojaItem
// } from "../../../api/dashboardsApi";

// const PoojaItemsForm = ({ pooja, onClose }) => {
//   debugger
//   const [itemsList, setItemsList] = useState([]);
//   const [poojaItems, setPoojaItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch Items and Pooja Items
//   useEffect(() => {
//     if (pooja?.id) {
//       fetchItemsAndPoojaData();
//     }
//   }, [pooja]);

//   const fetchItemsAndPoojaData = async () => {
//     try {
//       setLoading(true);
//       const [itemsData, poojaItemsData] = await Promise.all([
//         getAllItems(),
//         getPoojaItemsByid(pooja.id),
//       ]);

//       // Add a flag to identify existing items
//       const formattedPoojaItems = poojaItemsData.map((item) => ({
//         ...item,
//         isExisting: true,
//       }));

//       setItemsList(itemsData.items);
//       setPoojaItems(formattedPoojaItems);
//     } catch (error) {
//       console.error("Error loading pooja items:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Add new empty item
//   const handleAddItem = () => {
//     setPoojaItems((prev) => [
//       ...prev,
//       { item_id: "", quantity: 1, price: 0, isExisting: false },
//     ]);
//   };

//   // 🔹 Handle field changes
//   const handleChange = (index, field, value) => {
//     setPoojaItems((prev) =>
//       prev.map((item, i) =>
//         i === index ? { ...item, [field]: value } : item
//       )
//     );
//   };

//   // 🔹 Delete item
//   const handleDeleteItem = async (index, item) => {
//     if (item.isExisting && item.id) {
//       // Confirm before deleting from DB
//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this item?"
//       );
//       if (!confirmDelete) return;

//       try {
//         await deletePoojaItem(item.id);
//         setPoojaItems((prev) => prev.filter((_, i) => i !== index));
//       } catch (error) {
//         console.error("Error deleting pooja item:", error);
//       }
//     } else {
//       // Just remove from state (new unsaved item)
//       setPoojaItems((prev) => prev.filter((_, i) => i !== index));
//     }
//   };

//   // 🔹 Save only new items (avoid duplicate API calls)
//   const handleSave= async (item) => {
//     try {
//       // const newItems = poojaItems.filter((item) => !item.isExisting);

//       // if (newItems.length === 0) {
//       //   alert("No new items to save.");
//       //   onClose();
//       //   return;
//       // }

//       // for (let item of newItems) {
//       //   if (!item.item_id) continue; // skip incomplete
//       //   await addPoojaItem({
//       //     pooja_id: pooja.id,
//       //     item_id: item.item_id,
//       //     quantity: item.quantity,
//       //     price: item.price,
//       //   });
//       // }
//  const poojaItem =  await addPoojaItem({
//       pooja_id: pooja.id,
//       item_id: item.item_id,
//       quantity: item.quantity,
//       price: item.price,
//     })

//       alert("Items saved successfully!"+poojaItem);
//       onClose();
//     } catch (error) {
//       console.error("Error saving pooja items:", error);
//     }
//   };

//   if (loading) return <p>Loading pooja items...</p>;

//   return (
//     <div className="overflow-y-scroll max-h-[400px]">
//       {poojaItems.map((item, index) => (
//         <div
//           key={index}
//           className="flex gap-2 items-center border p-2 rounded-lg shadow-sm"
//         >
//           {/* Dropdown */}
//           <select
//             className="border p-2 rounded flex-1"
//             value={item.item_id || ""}
//             onChange={(e) => handleChange(index, "item_id", e.target.value)}
//           >
//             <option value="">Select Item</option>
//             {itemsList.map((it) => (
//               <option key={it.id} value={it.id}>
//                 {it.name}
//               </option>
//             ))}
//           </select>

//           {/* Quantity */}
//           <input
//             type="string"
//             placeholder="Qty"
//             className="border p-2 rounded w-20"
//             value={item.quantity}
//             onChange={(e) => handleChange(index, "quantity", e.target.value)}
//           />

//           {/* Price */}
//           <input
//             type="number"
//             placeholder="Price"
//             className="border p-2 rounded w-24"
//             value={item.price}
//             onChange={(e) => handleChange(index, "price", e.target.value)}
//           />


//           {/* Delete Button */}
//           { item.isExisting ?<button
//             className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
//             onClick={() => handleDeleteItem(index, item)}>
//             Delete
//           </button>
//           : 
//           <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded" onClick={()=>handleSave(item)}>
//           Save
//           </button>}
          
//         </div>
//       ))}

//       {/* Buttons */}
//       <div className="flex justify-between items-center  mt-4 sticky bottom-0 left-0 bg-white">
//       <div className="flex gap-2">
//         <button
//           className="bg-gray-500 text-white px-4 py-2 rounded"
//           onClick={onClose}
//         >
//           Cancel
//         </button>

        
//           <button
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//             onClick={handleAddItem}
//           >
//             + Add Item
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PoojaItemsForm;

import React, { useState, useEffect } from "react";
import {
  getPoojaItemsByid,
  getAllItems,
  addPoojaItem,
  deletePoojaItem,
} from "../../../api/dashboardsApi";

const PoojaItemsForm = ({ pooja, onClose }) => {
  const [itemsList, setItemsList] = useState([]);
  const [poojaItems, setPoojaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // new spinner for save/delete

  useEffect(() => {
    if (pooja?.id) {
      fetchItemsAndPoojaData();
    }
  }, [pooja]);

  const fetchItemsAndPoojaData = async () => {
    try {
      setLoading(true);
      const [itemsData, poojaItemsData] = await Promise.all([
        getAllItems(),
        getPoojaItemsByid(pooja.id),
      ]);
      const formattedPoojaItems = poojaItemsData.map((item) => ({
        ...item,
        isExisting: true,
      }));
      setItemsList(itemsData.items);
      setPoojaItems(formattedPoojaItems);
    } catch (error) {
      console.error("Error loading pooja items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setPoojaItems((prev) => [
      ...prev,
      { item_id: "", quantity: 1, price: 0, isExisting: false },
    ]);
  };

  const handleChange = (index, field, value) => {
    setPoojaItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleDeleteItem = async (index, item) => {
    if (item.isExisting && item.id) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!confirmDelete) return;

      try {
        setSaving(true);
        await deletePoojaItem(item.id);
        setPoojaItems((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Error deleting pooja item:", error);
      } finally {
        setSaving(false);
      }
    } else {
      setPoojaItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async (item) => {
    try {
      setSaving(true);
      const poojaItem = await addPoojaItem({
        pooja_id: pooja.id,
        item_id: item.item_id,
        quantity: item.quantity,
        price: item.price,
      });
      alert("Item saved successfully!");
      fetchItemsAndPoojaData(); // refresh after save
    } catch (error) {
      console.error("Error saving pooja items:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="relative overflow-y-scroll max-h-[400px]">
      {/* Spinner overlay for saving */}
      {saving && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {poojaItems.map((item, index) => (
        <div
          key={index}
          className="flex gap-2 items-center border p-2 rounded-lg shadow-sm"
        >
          <select
            className="border p-2 rounded flex-1"
            value={item.item_id || ""}
            onChange={(e) => handleChange(index, "item_id", e.target.value)}
          >
            <option value="">Select Item</option>
            {itemsList.map((it) => (
              <option key={it.id} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>

          <input
            type="string"
            placeholder="Qty"
            className="border p-2 rounded w-20"
            value={item.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded w-24"
            value={item.price}
            onChange={(e) => handleChange(index, "price", e.target.value)}
          />

          {item.isExisting ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
              onClick={() => handleDeleteItem(index, item)}
            >
              Delete
            </button>
          ) : (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
              onClick={() => handleSave(item)}
            >
              Save
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center mt-4 sticky bottom-0 left-0 bg-white">
        <div className="flex gap-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleAddItem}
          >
            + Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoojaItemsForm;

