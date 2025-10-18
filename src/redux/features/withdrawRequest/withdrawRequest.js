import { apiSlice } from "../../api/apiSlice";

const withdrawRequest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllWithdrawRequest: builder.query({
            query: () => '/withdrawal-requst/paginate/for-admin'
        })
    })
})

export const { useGetAllWithdrawRequestQuery } = withdrawRequest