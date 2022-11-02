import React from "react";
import { useSelector } from "react-redux";

function Order() {
  const orderItems = useSelector((state) => state.order.orderList);

  /* 
 
        id: Math.floor(Math.random() * 1000) + new Date().getTime(),
        date: new Date().toLocaleDateString(),
        status: "pending",
        expectedDelivery: new Date().toLocaleDateString(),
        cart: cartItem,
 
  */

  /* show in tabular formate cause this page is read only page 
  Date wise order list will be shown
  */

  return (
    <div className="flex flex-col items-center h-screen p-10">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
        Order List
      </h2>
      <div>
        <table className="table-auto">
          <thead>
            <tr className="border-2 border-gray-300">
              <th className="px-4 py-2">Order Id</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Expected Delivery</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.length == 0 ? (
              <h1 className="text-2xl font-bold text-gray-700  mt-10">
                You have no order yet
              </h1>
            ) : (
              orderItems.map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.date}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">{order.expectedDelivery}</td>
                  <td className="border px-4 py-2">
                    {order.cart.reduce((acc, item) => acc + item.price, 0) + 50}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
