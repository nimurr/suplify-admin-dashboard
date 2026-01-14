import { apiSlice } from "../../api/apiSlice";

export const HireSpecialistRequest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllHireSpecialistRequests: builder.query({
            query: ({ page, limit }) => {
                return {
                    url: `/hire-specialist/paginate?page=${page}&limit=${limit}`,
                    method: "GET",
                }
            },
        })
    }),
})

export const { useGetAllHireSpecialistRequestsQuery } = HireSpecialistRequest;