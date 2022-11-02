import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ${url}/get-products?page=${page}&limit=${limit}&orderBy=${orderBy} */

export const ecommerceCoreApi = createApi({
  reducerPath: "ecommerceCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit, orderBy }) => ({
        url: `/get-products?page=${page}&limit=${limit}&orderBy=${orderBy}`,
        method: "GET",
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `/get-products?page=1&limit=38&orderBy=asc`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetAllProductsQuery } = ecommerceCoreApi;
