import { apiSlice } from "../../api/apiSlice";

export const SuplifyHotspot = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSuplifyHotspot: builder.query({
            query: ({ page, limit }) => {
                return {
                    url: `/hotspot/paginate?page=${page}&limit=${limit}`,
                    method: "GET",
                }
            },
        }),
    }),
})

export const { useGetSuplifyHotspotQuery } = SuplifyHotspot