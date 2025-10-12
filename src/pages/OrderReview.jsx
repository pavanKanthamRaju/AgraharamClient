// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../context/appContext";

// const OrderReviewPage = () => {
//   const { orderData, address, setAddress } = useAppContext();
//   const navigate = useNavigate();
//   const [poojaDate, setPoojaDate] = useState("");
//   const [poojaTime, setPoojaTime] = useState("");

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };
//   const handleConfirm = () => {
//     if (!address || !poojaDate || !poojaTime) {
//       alert("Please fill all the details before proceeding.");
//       return;
//     }

 

//     navigate("/payment"); // or show a success page
//   };

//   if (!orderData) {
//     return (
//       <div className="text-center mt-10 text-red-600">
//         No order data found. Please go back and select a pooja.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fffaf0] p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-orange-700 mb-4">Review Your Order</h2>

//         <div className="mb-4">
//           <h3 className="text-xl font-semibold mb-1">{orderData.poojaName}</h3>
//           <p className="text-gray-700">{orderData.description}</p>
//         </div>

//         <div className="mb-4">
//           <h4 className="font-semibold text-orange-700 mb-2">Selected Items:</h4>
//           <ul className="list-disc ml-5 text-gray-800">
//             {orderData.items?.map((item, index) => (
//               <li key={index}>
//                 {item.name} ({item.quantity}) – ₹{item.price}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="mb-4">
//           <p className="text-lg font-medium">
//             Item Total: ₹{orderData.itemCost}
//           </p>
//           <p className="text-lg font-bold">
//             Total Price: ₹{orderData.totalPrice}
//           </p>
//         </div>

//         {/* Address Input */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium text-gray-700">Delivery Address</label>
//           <textarea
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             rows={3}
//             className="w-full border rounded-md p-2"
//             placeholder="Enter full address"
//           />
//         </div>

//         {/* Date & Time */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1">
//             <label className="block mb-1 font-medium text-gray-700">Pooja Date</label>
//             <input
//               type="date"
//               value={poojaDate}
//               onChange={(e) => setPoojaDate(e.target.value)}
//               className="w-full border rounded-md p-2"
//             />
//           </div>

//           <div className="flex-1">
//             <label className="block mb-1 font-medium text-gray-700">Pooja Time</label>
//             <input
//               type="time"
//               value={poojaTime}
//               onChange={(e) => setPoojaTime(e.target.value)}
//               className="w-full border rounded-md p-2"
//             />
//           </div>
//         </div>

//         {/* Confirm Button */}
//         <button
//           onClick={handleConfirm}
//           className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md"
//         >
//           Confirm & Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderReviewPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import apiClient from "../utils/appClient";
import axios from "axios";

const OrderReviewPage = () => {
  const { orderData, address, setAddress } = useAppContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [poojaDate, setPoojaDate] = useState("");
  const [poojaTime, setPoojaTime] = useState("");

  // ✅ Function to dynamically load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Payment handler
  const handleConfirm = async () => {
    if (!address || !poojaDate || !poojaTime) {
      alert("Please fill all the details before proceeding.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet.");
      return;
    }

    try {
      // ✅ Create order on backend
      const orderResponse = await apiClient.post("payment/create-order", {
        amount: orderData.totalPrice,
        currency: "INR"
      });

      const { orderId, amount, currency, key } = orderResponse.data;

      // ✅ Configure Razorpay payment window
      const options = {
        key:key, // or process.env.REACT_APP_RAZORPAY_KEY_ID
        amount: amount.toString(),
        currency,
        name: "Pooja Booking App",
        description: `Booking for ${orderData.poojaName}`,
        order_id: orderId,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#f97316", // orange color
        },
        handler: async function (response) {
          // ✅ Verify payment on backend
          const verifyRes = await axios.post("http://localhost:5080/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            user_id: user? user.user.id: "",
            pooja_id: orderData.poojaId,
            total_amount:amount,
            booking_date:poojaDate,
            booking_time:poojaTime,
            address,
          });

          if (verifyRes.data.success) {
            alert("🎉 Payment successful!");
             navigate("/orders");
          } else {
            alert("❌ Payment verification failed!");
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("❌ Payment error:", err);
      alert("Payment initialization failed. Please try again later.");
    }
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
          <p className="text-lg font-medium">Item Total: ₹{orderData.itemCost}</p>
          <p className="text-lg font-bold">Total Price: ₹{orderData.totalPrice}</p>
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

