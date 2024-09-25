import { configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from '../features/apiSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,  // Register API slice
    auth: authReducer,  // Register auth slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),  // Add API middleware
});

export default store;
