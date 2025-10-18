import React, { useEffect, useState } from "react";
import {getAllOrders } from "../../api/dashboardsApi";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        debugger
        setOrders(res.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">User ID</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-50">
                  <td className="p-2 border">{order.order_id}</td>
                  <td className="p-2 border">{order.user_id}</td>
                  <td className="p-2 border">₹{order.total_amount / 100}</td>
                  <td className="p-2 border text-green-700 font-medium">{order.payment_status}</td>
                  <td className="p-2 border text-green-700 font-medium">{order.address}</td>
                  {/* <td className="p-2 border">
                    {order.order_items?.map((item, i) => (
                      <div key={i}>
                        Item #{item.item_id} — {item.quantity} × ₹{item.price}
                      </div>
                    ))} 
                  </td>*/}
                  <td className="p-2 border">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
