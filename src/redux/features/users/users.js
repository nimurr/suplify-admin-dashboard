import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: '/users/paginate?approvalStatus=approved',
                method: 'GET',
            }),
        }),
        getUserProfile: builder.query({
            query: (userId) => ({
                url: `/users/profile/for-admin?_id=${userId}`,
                method: 'GET',
            }),
        }),

    })
})
export const {
    useGetAllUsersQuery,
    useGetUserProfileQuery,

} = userApi