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
        viseSubRequest: builder.query({
            query: ({ page, limit }) => ({
                url: `/vise-subscription-request/paginate?page=${page}&limit=${limit}`,
                method: "GET"
            }),
            providesTags: ["ViseSubRequest"]
        }),
        acceptAndRejectVise: builder.mutation({
            query: ({ id, data }) => ({
                url: `/vise-subscription-request/change-status/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["ViseSubRequest"]
        })
    })

})

export const { useGetSubscriptionQuery, useAddSubscriptionMutation, useDeleteSubscriptionMutation, useViseSubRequestQuery  , useAcceptAndRejectViseMutation} = subscriptionApi