

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsheakh6731.sobhoy.com/api/v1",
    prepareHeaders: (headers, { getState }) => {

      let token = null;

      if (typeof window !== 'undefined') {
        const token2 = localStorage.getItem("token");
        if (token2) {
          token = token2;
        }
      }
      //   console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Promotion", "Product", "Users", "Coupon", "About", "Order", "AllSuppliments", "BookedLavTest", "Subscription", "Profile", "Settings"],

  endpoints: () => ({}),
});
