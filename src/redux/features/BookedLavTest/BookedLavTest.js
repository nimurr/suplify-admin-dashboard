import { apiSlice } from "../../api/apiSlice";

const BookedLavTest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookedLavTest: builder.query({
            query: () => ({
                url: `/labTest-bookings/paginate`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetBookedLavTestQuery } = BookedLavTest;