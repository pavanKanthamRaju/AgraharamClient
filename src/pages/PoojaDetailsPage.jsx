import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPoojaById } from "../api/dashboardsApi";

const PoojaDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pooja, setPooja] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    getPoojaById(Number(id)).then((data) => {
      setPooja(data);
    });
  }, [id]);

  const basePrice = pooja?.price
    ? parseInt(pooja.price.replace(/[^0-9]/g, ""), 10)
    : 0;

  const items = pooja?.items || [];

  const handleToggleItem = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.name === item.name);
      const updated = exists
        ? prev.filter((i) => i.name !== item.name)
        : [...prev, item];
      setSelectAll(updated.length === items.length);
      return updated;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(items);
      setSelectAll(true);
    }
  };

  const itemsPrice = selectedItems.reduce((sum, item) => sum + Number(item.price), 0);
  const totalPrice = basePrice + itemsPrice;

  if (!pooja) {
    return (
      <div className="text-center py-10 text-orange-600 font-medium">
        Loading Pooja Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf0] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row">

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={pooja.image}
            alt={pooja.name}
            className="h-full w-full object-contains"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-orange-800 mb-4">
              {pooja.name}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {pooja.description}
            </p>

            {/* Items with Select All */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-orange-700 mb-2">Required Items:</h3>

              {/* Select All */}
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="accent-orange-600 mr-2"
                />
                <label htmlFor="select-all" className="text-gray-900 font-medium">
                  Select All
                </label>
              </div>

              {/* Item List */}
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`item-${idx}`}
                      checked={selectedItems.some((i) => i.name === item.name)}
                      onChange={() => handleToggleItem(item)}
                      className="accent-orange-600"
                    />
                    <label htmlFor={`item-${idx}`} className="text-gray-800">
                      {item.name} ({item.quantity}) – ₹{item.price}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 text-right text-xl font-semibold text-orange-800">
            Total Price: ₹{totalPrice.toLocaleString()}
          </div>

          {/* Checkout */}
          <div className="mt-6">
            <button
              onClick={() => navigate(`/checkout/${pooja.id}`,{
                state: { poojaId: pooja.id }})}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-md w-full transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoojaDetailsPage;
