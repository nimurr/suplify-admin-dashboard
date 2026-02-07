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
        getMyQsAns: builder.query({
            query: ({ id }) => `/assessment-answers/paginate?userId=${id}&limit=50`,
            providesTags: ['MyQsAns']
        })
    })
})

export const { useGetQuestionsQuery, useCreateQuestionMutation, useDeleteQuestionMutation , useGetMyQsAnsQuery } = questionsApi;