import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/features/cartSlice";

function ProductDetail() {
  const product = useSelector((state) => state.product.product);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col items-center h-[90vh] p-10">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
        Product Detail
      </h2>
      <div className="max-w-2xl my-auto">
        <div className="flex items-center justify-center g-4">
          <img
            className="object-fit w-auto h-86 mx-auto my-2 rounded-md shadow-md"
            src={product.image}
          />

          <div className="flex flex-col p-4">
            <h1 className="mx-5 text-2xl font-bold text-gray-700 dark:text-white">
              {product.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mx-6">
              {product.category}
            </p>

            <p className="text-gray-600 dark:text-gray-400  mx-6">
              &#8377;{product.price}
            </p>

            <p className="text-gray-600 dark:text-gray-400  mx-6">
              {/* random discription  */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quibusdam. Quisquam, quibusdam. Quisquam, quibusdam. Quisquam,
              quibusdam. Quisquam, quibusdam. Quisquam, quibusdam. Quisquam,
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            </p>

            <button
              className="px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
