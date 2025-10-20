import { apiSlice } from "../../api/apiSlice";

const BookedLavTest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookedLavTest: builder.query({
            query: () => ({
                url: `/labTest-bookings/paginate`,
                method: "GET",
            }),
            providesTags: ["BookedLavTest"],
        }),
        updateBookedLavTest: builder.mutation({
            query: ({ data, id }) => ({
                url: `/labTest-bookings/update/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["BookedLavTest"],
        }),
        deleteBookedLavTest: builder.mutation({
            query: ({ data }) => ({
                url: `/products/softDelete/${data.id}`,
                method: "PUT",
            }),
            invalidatesTags: ["BookedLavTest"],
        }),
    }),
});

export const { useGetBookedLavTestQuery, useUpdateBookedLavTestMutation  , useDeleteBookedLavTestMutation} = BookedLavTest;