import { apiSlice } from "../../api/apiSlice";


export const settingsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: (type) => `/settings/?type=${type}`,
            providesTags: ["Settings"],
        }),
        updateSettings: builder.mutation({
            query: ({ data, type }) => ({
                url: `/settings/?type=${type}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Settings"],
        }),
    }),
});


export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
