import { apiSlice } from "../../../api/apiSlice";


const updateProfile = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: ({ id }) => ({
                url: `/users/profile/${id}`,
                method: "GET"
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `/common/self`,
                method: "PUT",
                body: data
            })
        })
    })
})

export const { useGetProfileQuery, useUpdateProfileMutation } = updateProfile;