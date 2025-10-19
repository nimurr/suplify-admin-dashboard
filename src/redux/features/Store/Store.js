import { apiSlice } from "../../api/apiSlice";

export const storeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStoreItems: builder.query({
            query: () => '/products/category-with-count',
            providesTags: ['StoreItems']
        }),
        getAllSuppliments: builder.query({
            query: (category) => `/products/paginate?category=${category}`,
            providesTags: ['AllSuppliments']
        }),
    }),
});


export const {
    useGetStoreItemsQuery,
    useGetAllSupplimentsQuery
} = storeApi;