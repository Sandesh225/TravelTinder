import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  logOut,
  setCredentials,
  getUserFromLocalStorage,
} from "../../features/authSlice";
import {
  useLogoutUserMutation,
  useGetCurrentUserQuery,
} from "../../features/apiSlice";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // API Hooks
  const { data: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated, // Only run the query if user is authenticated
  });
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser && !isAuthenticated) {
      dispatch(setCredentials({ user: storedUser }));
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logOut());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to log out!");
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-blue-300 transition duration-300"
        >
          Travel Tinder
        </Link>
        <div className="flex items-center space-x-6">
          <NavLink label="Home" to="/home" />
          <NavLink label="Explore" to="/explore" />
          <NavLink label="Matches" to="/matches" />
          <NavLink label="Profile" to="/profile" />
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="mr-4">
                Welcome, {currentUser?.username || user?.username}
              </span>
              <LogoutButton
                handleLogout={handleLogout}
                isLoggingOut={isLoggingOut}
              />
            </>
          ) : (
            <>
              <NavLink label="Login" to="/login" />
              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ label, to }) => (
  <Link to={to} className="hover:text-blue-300 transition duration-300">
    {label}
  </Link>
);

// Logout Button Component
const LogoutButton = ({ handleLogout, isLoggingOut }) => (
  <button
    onClick={handleLogout}
    className={`bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition ${
      isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={isLoggingOut}
  >
    {isLoggingOut ? "Logging out..." : "Logout"}
  </button>
);

export default Navbar;
