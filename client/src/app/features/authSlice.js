import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

// Safely parse the user from localStorage if it exists and is valid JSON
const storedUser = (() => {
  const userString = localStorage.getItem('user');
  try {
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return null;
  }
})();

const initialState = {
  user: storedUser,  // If user exists in localStorage, set it; otherwise, null
  isAuthenticated: !!storedUser,  // Set isAuthenticated based on whether the user is present
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');  // Remove user from localStorage on logout
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));  // Store user in localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        if (action.payload) {
          localStorage.setItem('user', JSON.stringify(action.payload));  // Save user in localStorage
        }
      })
      .addMatcher(apiSlice.endpoints.registerUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        if (action.payload) {
          localStorage.setItem('user', JSON.stringify(action.payload));  // Save user in localStorage
        }
      })
      .addMatcher(apiSlice.endpoints.logoutUser.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');  // Remove user from localStorage
      })
      .addMatcher(apiSlice.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        if (action.payload) {
          localStorage.setItem('user', JSON.stringify(action.payload));  // Save user in localStorage
        }
      })
      .addMatcher(apiSlice.endpoints.getCurrentUser.matchRejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');  // Remove user from localStorage if session expired
      });
  },
});

// Export the actions for use in your components
export const { logout, setUser } = authSlice.actions;

// Export the auth reducer for inclusion in the store
export default authSlice.reducer;
