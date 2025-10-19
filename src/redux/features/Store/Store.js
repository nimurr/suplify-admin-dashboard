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
        createSuppliment: builder.mutation({
            query: (supplimentData) => ({
                url: '/products/create',
                method: 'POST',
                body: supplimentData,
            }),
            invalidatesTags: ['AllSuppliments', 'StoreItems']
        }),
    }),
});


export const {
    useGetStoreItemsQuery,
    useGetAllSupplimentsQuery,
    useCreateSupplimentMutation
} = storeApi;