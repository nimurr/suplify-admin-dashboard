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
        deleteSuplifyHotspot: builder.mutation({
            query: ({ id }) => ({
                url: `/hotspot/${id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const { useGetSuplifyHotspotQuery, useCreateSuplifyHotspotMutation, useUpdateSuplifyHotspotMutation , useDeleteSuplifyHotspotMutation } = SuplifyHotspot;