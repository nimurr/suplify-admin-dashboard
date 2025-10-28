import { apiSlice } from "../../../api/apiSlice";


const updateProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: ({ id }) => ({
                url: `/users/profile/${id}`,
                method: "GET"
            }),
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation({
            query: ({data , id}) => ({
                url: `/users/profile/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Profile"],
        })
    })
})

export const { useGetProfileQuery, useUpdateProfileMutation } = updateProfile;