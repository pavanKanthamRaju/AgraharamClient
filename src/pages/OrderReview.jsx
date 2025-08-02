import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const OrderReviewPage = () => {
  const { orderData, address, setAddress } = useAppContext();
  const navigate = useNavigate();
  const [poojaDate, setPoojaDate] = useState("");
  const [poojaTime, setPoojaTime] = useState("");

  const handleConfirm = () => {
    if (!address || !poojaDate || !poojaTime) {
      alert("Please fill all the details before proceeding.");
      return;
    }

 

    navigate("/payment"); // or show a success page
  };

  if (!orderData) {
    return (
      <div className="text-center mt-10 text-red-600">
        No order data found. Please go back and select a pooja.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf0] p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Review Your Order</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-1">{orderData.poojaName}</h3>
          <p className="text-gray-700">{orderData.description}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-orange-700 mb-2">Selected Items:</h4>
          <ul className="list-disc ml-5 text-gray-800">
            {orderData.items?.map((item, index) => (
              <li key={index}>
                {item.name} ({item.quantity}) – ₹{item.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-lg font-medium">
            Item Total: ₹{orderData.itemCost}
          </p>
          <p className="text-lg font-bold">
            Total Price: ₹{orderData.totalPrice}
          </p>
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full border rounded-md p-2"
            placeholder="Enter full address"
          />
        </div>

        {/* Date & Time */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">Pooja Date</label>
            <input
              type="date"
              value={poojaDate}
              onChange={(e) => setPoojaDate(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">Pooja Time</label>
            <input
              type="time"
              value={poojaTime}
              onChange={(e) => setPoojaTime(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md"
        >
          Confirm & Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderReviewPage;
