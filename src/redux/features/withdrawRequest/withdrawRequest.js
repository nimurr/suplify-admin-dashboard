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
        }),

        getAllEarnings: builder.query({
            query: () => ({
                url: '/payment-transactions/overview/admin',
                method: 'GET'
            })
        }),

        getAllTransactions: builder.query({
            query: () => ({
                url: '/payment-transactions/paginate',
                method: 'GET'
            })
        })
    })
})

export const { useGetAllWithdrawRequestQuery, useProofOfpaymentMutation, useGetAllEarningsQuery , useGetAllTransactionsQuery } = withdrawRequest