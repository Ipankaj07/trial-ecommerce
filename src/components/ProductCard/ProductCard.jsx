import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setProduct } from "../../redux/features/productSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  // const { id, name, price, image, category } = product;

  const handleProductClick = () => {
    dispatch(setProduct(product));
  };

  return (
    <div
      key={product.id}
      className="flex flex-col items-center justify-center max-w-sm px-6 py-4 mx-auto my-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <Link to={`/product/${product.id}`}>
        <div className="flex flex-col w-[300px] items-center justify-center my-2" 
        onClick={handleProductClick}
        >
          <img
             className="object-fit w-auto h-86 mx-auto my-2 rounded-md shadow-md"
            src={product.image}
          />

          <div className="flex flex-col items-center justify-center">
            <h1 className="mx-5 text-2xl font-bold text-gray-700 dark:text-white">
              {product.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-400">
              {product.category}
            </p>

            <p className="text-gray-600 dark:text-gray-400  mx-4">
              &#8377;{product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
