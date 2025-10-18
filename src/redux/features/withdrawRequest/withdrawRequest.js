import { apiSlice } from "../../api/apiSlice";

const withdrawRequest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllWithdrawRequest: builder.query({
            query: () => '/withdrawal-requst/paginate/for-admin'
        }),
        proofOfpayment: builder.mutation({
            query: ({ data, id }) => ({
                url: `/withdrawal-requst/${id}`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { useGetAllWithdrawRequestQuery, useProofOfpaymentMutation } = withdrawRequest