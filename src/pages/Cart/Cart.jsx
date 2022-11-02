import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  increamentQuantity,
  decreamentQuantity,
  removeFromCart,
  clearCart,
  checkOut,
} from "../../redux/features/cartSlice";

import { addOrder } from "../../redux/features/orderSlice";

function Cart() {
  const dispatch = useDispatch();

  const deliveryCharge = 50;

  const handleIncreament = (id) => {
    dispatch(increamentQuantity(id));
  };

  const handleDecreament = (id) => {
    dispatch(decreamentQuantity(id));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartItem = useSelector((state) => state.cart.cart);
  console.log("cartItem", cartItem);

  const handleCheckOut = () => {
    dispatch(checkOut(true));
  };

  const handleAddOrder = () => {
    dispatch(
      addOrder({
        id: Math.floor(Math.random() * 1000) + new Date().getTime(),
        date: new Date().toLocaleDateString(),
        status: "pending",
        expectedDelivery: new Date().toLocaleDateString(),
        cart: cartItem,
      }),
    );
  };

  const placeOrder = () => {
    if (cartItem.length > 0) {
      handleCheckOut();
      handleAddOrder();
    }
  };

  return (
    <div className="flex w-full h-full">
      {cartItem.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full flex-1">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white mt-20">
            Your Cart is Empty
          </h1>
        </div>
      ) : (
        <div className="flex flex-wrap w-full h-full flex-1">
          {cartItem.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center max-w-sm px-6 py-4 mx-auto my-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
              <div className="flex w-[300px] flex-col items-center justify-center my-2">
                <img
                  className="object-fit w-auto h-86 mx-auto my-2 rounded-md shadow-md"
                  src={item.image}
                />

                <div className="flex flex-col items-center justify-center">
                  <h1 className="mx-5 text-2xl font-bold text-gray-700 dark:text-white">
                    {item.title}
                  </h1>

                  <p className="text-gray-600 dark:text-gray-400">
                    {item.category}
                  </p>

                  <p className="text-gray-600 dark:text-gray-400  mx-4">
                    &#8377;{item.price}
                  </p>

                  <div className="flex flex-row items-center justify-center my-2">
                    <button
                      className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={() => handleIncreament(item.id)}
                    >
                      +
                    </button>
                    <p className="mx-2">{item.quantity}</p>
                    <button
                      className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={() => handleDecreament(item.id)}
                    >
                      -
                    </button>
                  </div>

                  <button
                    className="px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="max-w-[400px] flex-1 border-l-2 border-gray-300 dark:border-gray-700 p-10">
        <div className="flex flex-col items-center justify-center">
          <Link to="/order">
            <button className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              Go to Order
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white mt-10 mb-6">
            Cart Summary
          </h1>
          <div
            className="flex flex-col items-center justify-center w-full h-full 
          border-2 border-gray-300 dark:border-gray-700 p-6
          "
          >
            <div className="flex flex-row items-center justify-between w-full h-full my-2">
              <p className="text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-gray-600 dark:text-gray-400">
                {cartItem.length}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full h-full my-2">
              <p className="text-gray-600 dark:text-gray-400">
                Sub-total Price
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                &#8377;
                {cartItem.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0,
                )}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full h-full my-2">
              <p className="text-gray-600 dark:text-gray-400">
                Delivery Charge
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                &#8377;{cartItem.length > 0 ? deliveryCharge : 0}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full h-full my-2">
              <p className="text-gray-600 dark:text-gray-400">Total Amount</p>
              <p className="text-gray-600 dark:text-gray-400">
                &#8377;
                {cartItem.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0,
                ) + (cartItem.length > 0 ? deliveryCharge : 0)}
              </p>
            </div>
            <div className=" flex gap-4 items-center justify-center w-full h-full">
              <Link to="/order">
                <button
                  className="px-4 py-2 my-6 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </Link>

              <button
                className="px-4 py-2 my-6 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
