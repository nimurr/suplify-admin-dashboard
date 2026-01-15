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
        createSuplifyHotspot: builder.mutation({
            query: (data) => ({
                url: `/hotspot`,
                method: "POST",
                body: data,
            }),
        }),
        updateSuplifyHotspot: builder.mutation({
            query: ({ data, id }) => ({
                url: `/hotspot/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
})

export const { useGetSuplifyHotspotQuery, useCreateSuplifyHotspotMutation , useUpdateSuplifyHotspotMutation } = SuplifyHotspot;