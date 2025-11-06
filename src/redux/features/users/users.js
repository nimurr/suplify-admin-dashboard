import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ status, subStatus, role }) => ({
                url: `/users/paginate?approvalStatus=${status}&subscriptionType=${subStatus}&role=${role}`,
                method: 'GET',
            }),
        }),
        getUserProfile: builder.query({
            query: (userId) => ({
                url: `/users/profile/for-admin?_id=${userId}`,
                method: 'GET',
            }),
        }),

        getYourSpecialist: builder.query({
            query: (userId) => ({
                url: `/specialist-patients/paginate/for-admin?patientId=${userId}`,
                method: 'GET',
            }),
        }),
        getDoctors: builder.query({
            query: (userId) => ({
                url: `/doctor-patients/paginate/for-admin?patientId=${userId}`,
                method: 'GET',
            }),
        }),
        getAllAssigningDoctors: builder.query({
            query: (id) => ({
                url: `/doctor-patients/doctor/${id}`,
                method: 'GET',
            }),
        }),
        getAllAssigningSpacialists: builder.query({
            query: (id) => ({
                url: `/specialist-patients/specialist/${id}`,
                method: 'GET',
            }),
        }),

        assginSpecialist: builder.mutation({
            query: (data) => ({
                url: '/specialist-patients',
                method: 'POST',
                body: data,
            }),
        }),

        assignDoctor: builder.mutation({
            query: (data) => ({
                url: '/doctor-patients',
                method: 'POST',
                body: data,
            }),
        }),
        appRovedAndReject: builder.mutation({
            query: ({ id, approvalStatus }) => ({
                url: `/users/change-approval-status/?userId=${id}&approvalStatus=${approvalStatus}`,
                method: 'PUT'
            }),
        }),

    })
})
export const {
    useGetAllUsersQuery,
    useGetUserProfileQuery,
    useGetYourSpecialistQuery,
    useGetDoctorsQuery,
    useGetAllAssigningDoctorsQuery,
    useGetAllAssigningSpacialistsQuery,

    useAssginSpecialistMutation,
    useAssignDoctorMutation,
    useAppRovedAndRejectMutation

} = userApi