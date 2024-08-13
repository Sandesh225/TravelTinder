
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      const { accessToken, refreshToken, user } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      state.isAuthenticated = true;

      // Save tokens in cookies
     
      
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict;`;
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict;`;
      
    },
    logOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;

      // Remove tokens from cookies
      document.cookie = 'accessToken=; path=/; secure; samesite=strict;';
      document.cookie = 'refreshToken=; path=/; secure; samesite=strict;';
    },
  }, extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
        const { accessToken, refreshToken, user } = payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.user = user;
        state.isAuthenticated = true;

        // Save tokens in cookies
        document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict;`;
        document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict;`;
      })
      .addMatcher(apiSlice.endpoints.logoutUser.matchFulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.isAuthenticated = false;

        // Remove tokens from cookies
        document.cookie = 'accessToken=; path=/;  secure; samesite=strict;';
        document.cookie = 'refreshToken=; path=/;  secure; samesite=strict;';
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;