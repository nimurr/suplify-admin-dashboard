import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/users/paginate?approvalStatus=approved'
        })
    })
})
export const {
    useGetAllUsersQuery

} = userApi