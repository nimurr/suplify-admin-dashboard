import { apiSlice } from "../../api/apiSlice";


const order = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: `/orders/paginate`,
                method: "GET"
            }),
            providesTags: ["Order"],
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `/order-items?orderId=${id}`,
                method: "GET"
            }),
            providesTags: ["Order"],
        }),
        updateStatus: builder.mutation({
            query: ({data , id}) => ({
                url: `/orders/update/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Order"],
        })

    }),
});

export const { useGetAllOrderQuery, useGetOrderDetailsQuery , useUpdateStatusMutation} = order;