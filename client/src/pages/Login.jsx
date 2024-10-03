import React, { useState } from "react";
import { useLoginUserMutation } from "../app/features/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login initiated with email:", email);
    try {
      // API call to log in the user
      const user = await loginUser({ email, password }).unwrap();
      // Dispatch the user data to the store
      dispatch(setUser(user));
      console.log("Login successful. User data:", user);
      // Show success toast
      toast.success("Login successful!");
      // Navigate to the home or profile page
      navigate("/");
    } catch (err) {
      console.error("Login failed. Error details:", err);
      toast.error(err.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center font-[sans-serif] p-4 m-8">
      <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_rgba(195,169,50,0.5)] p-8 relative mt-12 bg-white rounded-lg">
        <div className="bg-white w-24 h-24 border-[10px] p-1.5 absolute left-0 right-0 mx-auto -top-12 rounded-full overflow-hidden shadow-lg">
          <button onClick={() => {}} className="w-full">
            <img src="logo.jpg" alt="logo" className="w-full" />
          </button>
        </div>

        {/* Form */}
        <form className="mt-12" onSubmit={handleLogin}>
          <h3 className="text-xl font-bold text-orange-500 mb-8 text-center">
            Login to your Account
          </h3>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 rounded-lg focus:bg-white focus:outline-orange-300 transition-all"
              placeholder="Enter email"
              required
            />
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 rounded-lg focus:bg-white focus:outline-orange-300 transition-all"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-4 px-8 text-sm tracking-wide font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-8 text-center text-gray-800">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
