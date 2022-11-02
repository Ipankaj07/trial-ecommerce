import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetAllProductsQuery } from "../../redux/services/ecommerceCore";

import { setProducts } from "../../redux/features/productSlice";

import ProductCard from "../ProductCard/ProductCard";

function ProductList() {
  const dispatch = useDispatch();

  const { data: allProducts, error, isLoading } = useGetAllProductsQuery();

  const [pageNumber, setPageNumber] = React.useState(1);
  const [limit, setLimit] = React.useState(12);
  const highToLow = useRef(false);
  const categoryAll = useRef(true);

  const categoryOptions = React.useMemo(() => {
    if (allProducts) {
      const categories = allProducts.data.map((product) => product.category);
      const uniqueCategories = [...new Set(categories)];
      return uniqueCategories.map((category) => ({
        value: category,
        label: category,
      }));
    }
  }, [allProducts]);

  const productFromStore = useSelector((state) => state.product.products);

  const filterByCategory = React.useCallback(
    (category) => {
      // console.log("category" + category);
      const filteredProducts = allProducts.data.filter(
        (product) => product.category === category,
      );
      if (highToLow.current) {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
      dispatch(
        setProducts(
          filteredProducts.slice((pageNumber - 1) * limit, pageNumber * limit),
        ),
      );
    },
    [allProducts, dispatch, pageNumber, limit],
  );

  const resetFilter = React.useCallback(() => {
    dispatch(
      setProducts(
        highToLow.current
          ? allProducts.data
              .slice((pageNumber - 1) * limit, pageNumber * limit)
              .sort((a, b) => b.price - a.price)
          : allProducts.data.slice(
              (pageNumber - 1) * limit,
              pageNumber * limit,
            ),
      ),
    );
  }, [allProducts, dispatch, pageNumber, limit]);

  const handleCategoryChange = React.useCallback(
    (e) => {
      if (e.target.value === "all") {
        categoryAll.current = true;
        setPageNumber(1);
        resetFilter();
      } else {
        categoryAll.current = false;
        filterByCategory(e.target.value);
      }
    },
    [filterByCategory, resetFilter],
  );

  React.useEffect(() => {
    if (allProducts) {
      dispatch(
        setProducts(
          allProducts.data.slice((pageNumber - 1) * limit, pageNumber * limit),
        ),
      );
    }
  }, [allProducts, dispatch, pageNumber, limit]);

  const dispatchProductsHighToLow = React.useCallback(() => {
    highToLow.current = true;

    //here i use slice() to make a copy of the array
    //Because the array is frozen in strict mode, you'll need to copy the array before sorting it

    const sortedProducts = productFromStore
      .slice()
      .sort((a, b) => b.price - a.price);
    dispatch(setProducts(sortedProducts));
  }, [productFromStore, dispatch]);

  const dispatchProductsLowToHigh = React.useCallback(() => {
    highToLow.current = false;
    const sortedProducts = productFromStore
      .slice()
      .sort((a, b) => a.price - b.price);
    dispatch(setProducts(sortedProducts));
  }, [productFromStore, dispatch]);

  const handlePageChange = React.useCallback(
    (e) => {
      setPageNumber(e.target.value);
    },
    [setPageNumber],
  );

  const handleLimitChange = React.useCallback(
    (e) => {
      setLimit(e.target.value);
    },
    [setLimit],
  );

  /* page options according to data length */
  const pageOptions = React.useMemo(() => {
    if (categoryAll.current && allProducts) {
      const pages = Math.ceil(allProducts.data.length / limit);
      return Array.from({ length: pages }, (_, i) => i + 1);
    } else {
      const pages = Math.ceil(productFromStore.length / limit);
      return Array.from({ length: pages }, (_, i) => i + 1);
    }
  }, [allProducts, productFromStore, filterByCategory]);

  // console.log(pageOptions);

  if (isLoading) {
    return (
      <div className="text-center w-screen h-[90vh]">
        <div className="flex justify-center items-center h-full">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Something went wrong</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-row items-center justify-center my-10">
        <div className="flex flex-col items-center justify-center mx-2">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={(e) => handleCategoryChange(e)}
          >
            <option value="all">All</option>
            {categoryOptions &&
              categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label.toUpperCase()}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col items-center justify-center mx-2">
          <label htmlFor="price">Price</label>
          <select
            name="price"
            id="price"
            onChange={(e) => {
              if (e.target.value === "asc") {
                dispatchProductsLowToHigh();
              } else {
                dispatchProductsHighToLow();
              }
            }}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center mx-2">
          <label htmlFor="page">Page</label>
          <select
            name="page"
            id="page"
            onChange={(e) => {
              handlePageChange(e);
            }}
          >
            {pageOptions &&
              pageOptions.map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col items-center justify-center mx-2">
          <label htmlFor="limit">Limit</label>
          <input
            type="number"
            name="limit"
            id="limit"
            onChange={handleLimitChange}
            min="1"
            value={limit}
            className="w-20"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productFromStore &&
            productFromStore.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
