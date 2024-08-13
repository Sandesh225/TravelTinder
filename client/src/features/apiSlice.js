import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken.split('=')[1]}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Profile', 'TravelPreference', 'Notification', 'Match'],
  endpoints: (builder) => ({
    // User Endpoints
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    fetchUser: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ userId, updateData }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    fetchAllUsers: builder.query({
      query: () => '/users',
      transformResponse: (response) => response.data || [],
      providesTags: ['User'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    // Profile Endpoints
    createProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile/create',
        method: 'POST',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
    fetchProfile: builder.query({
      query: (userId) => `/profile/${userId}`,
      providesTags: ['Profile'],
    }),
    fetchAllProfiles: builder.query({
      query: () => '/profile',
      transformResponse: (response) => response.data || [],
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: '/profile',
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
 



  
    // Travel Preferences Endpoints
    createTravelPreference: builder.mutation({
      query: (preferenceData) => ({
        url: '/travel',
        method: 'POST',
        body: preferenceData,
      }),
      invalidatesTags: ['TravelPreference'],
    }),
    fetchTravelPreferences: builder.query({
      query: () => '/travel',
      providesTags: ['TravelPreference'],
    }),
    updateTravelPreference: builder.mutation({
      query: ({ preferenceId, updateData }) => ({
        url: `/travel/${preferenceId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['TravelPreference'],
    }),
    deleteTravelPreference: builder.mutation({
      query: (preferenceId) => ({
        url: `/travel/${preferenceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TravelPreference'],
    }),

    // Notification Endpoints
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: '/notifications',
        method: 'POST',
        body: notificationData,
      }),
      invalidatesTags: ['Notification'],
    }),
    fetchNotifications: builder.query({
      query: () => '/notifications',
      providesTags: ['Notification'],
    }),
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notification'],
    }),
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),

    // Match Endpoints
    createMatch: builder.mutation({
      query: (matchData) => ({
        url: '/matches',
        method: 'POST',
        body: matchData,
      }),
      invalidatesTags: ['Match'],
    }),
    fetchMatches: builder.query({
      query: () => '/matches',
      providesTags: ['Match'],
    }),
    deleteMatch: builder.mutation({
      query: (matchId) => ({
        url: `/matches/${matchId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Match'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useFetchAllUsersQuery,
  useLogoutUserMutation,
  useCreateProfileMutation,
  useFetchProfileQuery,
  useFetchAllProfilesQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useCreateTravelPreferenceMutation,
  useFetchTravelPreferencesQuery,
  useUpdateTravelPreferenceMutation,
  useDeleteTravelPreferenceMutation,
  useCreateNotificationMutation,
  useFetchNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
  useCreateMatchMutation,
  useFetchMatchesQuery,
  useDeleteMatchMutation,
} = apiSlice;
