import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../app/";
import { logout } from "../../features/authSlice";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation(); // Include loading state
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <nav className="bg-transparent backdrop-blur-lg bg-opacity-10 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-white tracking-widest"
          aria-label="Travel Tinder Home"
        >
          Travel<span className="text-red-500">Tinder</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              {/* Animated Username */}
              <span className="text-white font-medium text-lg animate-pulse">
                Welcome,{" "}
                <span className="text-red-500 font-semibold">
                  {user.data.username}
                </span>
                !
              </span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`px-4 py-2 ${
                  isLoading
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white rounded-full transition duration-300 ease-in-out`}
                disabled={isLoading}
                aria-label="Logout"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
                aria-label="Login"
              >
                Login
              </Link>

              {/* Register Button */}
              <Link
                to="/register"
                className="px-4 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out"
                aria-label="Register"
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

export default Navbar;
