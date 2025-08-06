import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

// apiSlice.injectEndpoints: This function allows you to add endpoints to a pre-existing API slice.
// builder.mutation: This is used for API calls that modify data on the server.
// query function often takes an argument (like data or id) that contains the information needed to make the request.
// builder.query: This is used for API calls that fetch data (GET requests).
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // login data (email and password) as an argument it will put it in body and send a post request to the backend
      query: (data) => ({
        url: " /api/users/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      // resetPassword data (resettoken and new password) it will put it in body and send a patch request to the backend
      query: (data) => ({
        url: `${USERS_URL}/reset-password/${data.resetToken}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `${USERS_URL}/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = userApiSlice;
