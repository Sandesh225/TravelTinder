import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  setCredentials,
  getUserFromLocalStorage,
  logOut,
} from "./features/authSlice";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load components
const Hero = React.lazy(() => import("./components/Hero/Hero"));
const Home = React.lazy(() => import("./components/Home/Home"));
const ProfileSetup = React.lazy(() =>
  import("./components/Profile/ProfileSetup")
);
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Explore = React.lazy(() => import("./components/Explore/Explore"));
const MatchesPage = React.lazy(() => import("./components/Match/MatchesPage"));
import ProfileDetail from "./components/Profile/ProfileDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      dispatch(setCredentials({ user: storedUser }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const expirationTime = getTokenExpiration(token); // Implement this function to decode token expiration
      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        dispatch(logOut());
      }
    }
  }, [token, dispatch]);

  return (
    <Router>
      <Navbar />
      <React.Suspense fallback={<div className="spinner">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/profile-setup"
            element={
              <ProtectedRoute>
                <ProfileSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profiles/:id"
            element={
              <ProtectedRoute>
                <ProfileDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matches"
            element={
              <ProtectedRoute>
                <MatchesPage />
              </ProtectedRoute>
            }
          />

          {/* Explore Page */}
          <Route path="/explore" element={<Explore />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Suspense>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </Router>
  );
}

export default App;
