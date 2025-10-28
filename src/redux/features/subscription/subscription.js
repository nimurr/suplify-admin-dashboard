import { apiSlice } from "../../api/apiSlice";

export const subscriptionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubscription: builder.query({
            query: () => ({
                url: `/subscription-plans/paginate`,
                method: "GET"
            }),
            providesTags: ["Subscription"]
        }),
        addSubscription: builder.mutation({
            query: (data) => ({
                url: `/subscription-plans`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Subscription"]
        }),
        deleteSubscription: builder.mutation({
            query: ({ id, data }) => ({
                url: `/subscription-plans/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Subscription"]
        }),
    })

})

export const { useGetSubscriptionQuery , useAddSubscriptionMutation, useDeleteSubscriptionMutation } = subscriptionApi