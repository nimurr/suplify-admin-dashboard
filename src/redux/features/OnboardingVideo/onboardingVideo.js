import { apiSlice } from "../../api/apiSlice";

export const OnboardingVideo = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOnboardingVideo: builder.query({
            query: () => '/settings/?type=introductionVideo',
            providesTags: ['OnboardingVideo'],
        }),
        createOnboardingVideo: builder.mutation({
            query: (data) => ({
                url: '/settings/?type=introductionVideo',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['OnboardingVideo'],
        }),
    }),
});

export const {
    useGetOnboardingVideoQuery,
    useCreateOnboardingVideoMutation
} = OnboardingVideo;