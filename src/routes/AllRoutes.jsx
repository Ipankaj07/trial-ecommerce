import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Order from "../pages/Order";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route
          path="*"
          element={
            <div className="text-center text-2xl font-bold text-gray-500">
              404 Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default AllRoutes;
