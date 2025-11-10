import { apiSlice } from "../../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: (page) => `/notifications/admin-notifications?page=${page}&limit=20`
        })
    })
})

export const { useGetNotificationQuery } = notificationApi


// useGetFullSubscriptionQuery