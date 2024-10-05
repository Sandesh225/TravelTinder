import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include', // Ensures cookies are included in requests for session management
  }),
  endpoints: (builder) => ({
    // User Endpoints
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    getCurrentUser: builder.query({
      query: () => '/users/me',
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/users/me',
        method: 'PUT',
        body: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/users/me/password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
    getAllUsers: builder.query({
      query: () => '/users',
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),

    // Profile Endpoints
    upsertProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profiles/upsert',
        method: 'POST',
        body: profileData,
      }),
    }),
    getMyProfile: builder.query({
      query: () => '/profiles/me',
    }),
    getUserProfile: builder.query({
      query: (userId) => `/profiles/${userId}`,
    }),
    // Update this endpoint to handle fetching profiles for matching with usernames
    getAllProfilesForMatching: builder.query({
      query: (filters = {}) => ({
        url: `/profiles/match`,
        params: filters,
      }),
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: '/profiles/me',
        method: 'DELETE',
      }),
    }),


    createTravelPreference: builder.mutation({
      query: (travelData) => ({
        url: '/travel-preferences/preferences',
        method: 'POST',
        body: travelData,
      }),
    }),


    // Match Endpoints
    swipeUser: builder.mutation({
      query: ({ targetUserId, swipeDirection }) => ({
        url: '/swipe',
        method: 'POST',
        body: { targetUserId, swipeDirection },
      }),
    }),
    getMatches: builder.query({
      query: () => '/matches',
    }),
    getPendingMatches: builder.query({
      query: () => '/matches/pending',
    }),
    unmatchUser: builder.mutation({
      query: (matchId) => ({
        url: `/matches/${matchId}`,
        method: 'DELETE',
      }),
    }),
    getAllProfilesForExplore: builder.query({
      query: () => '/profiles/explore',
    }),

  }),
});

// Export hooks for the endpoints
export const {
  // User-related hooks
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,

  // Profile-related hooks
  useUpsertProfileMutation,
  useGetMyProfileQuery,
  useGetUserProfileQuery,
 useGetAllProfilesForExploreQuery,
  useGetAllProfilesForMatchingQuery,
  useDeleteProfileMutation,

  // Match-related hooks
  useSwipeUserMutation,
  useGetMatchesQuery,
  useGetPendingMatchesQuery,
  useUnmatchUserMutation,


  useCreateTravelPreferenceMutation
} = apiSlice;
