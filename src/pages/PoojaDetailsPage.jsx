import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPoojaById, getPoojaItemsByid } from "../api/dashboardsApi";
import {useAppContext} from "../context/appContext"

const PoojaDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pooja, setPooja] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [poojaItems, setPoojaItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const {orderData, setOrderData, setPoojsSelectedItems} = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
debugger
        const poojaData = await getPoojaById(Number(id));
        setPooja(poojaData);

        // Once we have pooja ID, fetch its items
        const itemsData = await getPoojaItemsByid(Number(id));
        setPoojaItems(itemsData);
      } catch (error) {
        console.error("Error fetching pooja details or items:", error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    if (orderData) {
      localStorage.setItem("orderData", JSON.stringify(orderData));
    }
  }, [orderData]);

    const poojaPrice = pooja?.base_price;

    // Use a fallback value (like 0) if basePrice is null or undefined
    const priceString = String(poojaPrice || 0); 
    
    const basePrice = parseFloat(priceString.replace(/[^0-9.]/g, ""));

  const handleToggleItem = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.name === item.name);
      const updated = exists
        ? prev.filter((i) => i.name !== item.name)
        : [...prev, item];
      setSelectAll(updated.length === poojaItems.length);
      return updated;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(poojaItems);
      setSelectAll(true);
    }
  };

  // const getItemTotal = () => {
  //   return selectedItems.reduce((total, item) => total + item.price, 0);
  // };

  const getItemTotal = () => {
    return selectedItems.reduce((total, item) => {
      // Use parseFloat to convert the item.price string into a number
      const priceAsNumber = parseFloat(item.price);
      
      // Check if the conversion resulted in a valid number (not NaN)
      if (!isNaN(priceAsNumber)) {
        return total + priceAsNumber;
      }
      
      // If the price is invalid, just return the current total
      return total;
    }, 0);
  };
  

  const handleCheckout = () => {
    const data = {
      poojaId:pooja.id,
      poojaName: pooja.name,
      description: pooja.description,
      price: pooja.base_price,
      itemCost: getItemTotal(),
      totalPrice,
      items: selectedItems,
    }
    setOrderData(data);
    setPoojsSelectedItems(selectedItems);
    navigate("/order-review");
  };
  debugger
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
        <div className="sm:w-1/2 h-[75vh]">
          <img
            src={pooja.image_url}
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
                {poojaItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`item-${idx}`}
                      checked={selectedItems.some((i) => i.name === item.name)}
                      onChange={() => handleToggleItem(item)}
                      className="accent-orange-600"
                    />
                    <label htmlFor={`item-${idx}`} className="text-gray-800">
                      {item.name} ({item.quantity} {item.units ? `*`  : ""}  {item.units}) – ₹{item.price}
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
              onClick={handleCheckout}
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
