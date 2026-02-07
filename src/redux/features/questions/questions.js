import { apiSlice } from "../../api/apiSlice";

const questionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: () => '/questions/question-ans',
            providesTags: ['Questions']
        }),
        createQuestion: builder.mutation({
            query: (data) => ({
                url: '/questions',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Questions']
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/questions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Questions']
        }),
    })
})

export const { useGetQuestionsQuery, useCreateQuestionMutation , useDeleteQuestionMutation } = questionsApi;