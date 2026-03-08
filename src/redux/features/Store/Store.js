import { apiSlice } from "../../api/apiSlice";

export const storeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStoreItems: builder.query({
            query: () => '/products/category-with-count',
            providesTags: ['StoreItems']
        }),
        getAllSuppliments: builder.query({
            query: ({ category, page, limit }) => `/products/paginate?category=${category}&page=${page}&limit=${limit}`,
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
        updateSupplimentItem: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['AllSuppliments', 'StoreItems']
        }),
        singleGetSuppliment: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ['SingleSuppliment']
        }),
    }),
});


export const {
    useGetStoreItemsQuery,
    useGetAllSupplimentsQuery,
    useCreateSupplimentMutation,
    useUpdateSupplimentItemMutation,
    useSingleGetSupplimentQuery
} = storeApi;