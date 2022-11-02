import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-row items-center justify-between w-full h-16 px-4 bg-white border-b border-gray-200">
      <div className="flex space-x-4">
        <Link
          to="/"
          className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          aria-current="page"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Cart
        </Link>
        <Link
          to="/order"
          className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Order
        </Link>
      </div>
    </div>
  );
}

export default Header;
