import React, { useState } from "react";
import { useRegisterUserMutation } from "../app/features/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser({ email, username, password }).unwrap();
      dispatch(setUser(user));
      toast.success("Registered successfully");
      navigate("/login"); // Navigate to login page after registration
    } catch (err) {
      toast.error(
        "Registration failed: " + (error?.data?.message || "An error occurred")
      );
      console.error("Registration failed:", err);
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
        <form className="mt-12" onSubmit={handleRegister}>
          <h3 className="text-xl font-bold text-orange-500 mb-8 text-center">
            Create Free Account
          </h3>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              name="username"
              type="text"
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 rounded-lg focus:bg-white focus:outline-orange-300 transition-all"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              name="email"
              type="email"
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 rounded-lg focus:bg-white focus:outline-orange-300 transition-all"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              name="password"
              type="password"
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 rounded-lg focus:bg-white focus:outline-orange-300 transition-all"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded text-orange-500 focus:ring-orange-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-800">
                I accept the{" "}
                <Link
                  to="/terms"
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-4 px-8 text-sm tracking-wide font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create an Account"}
            </button>
          </div>

          {/* Redirect to Login */}
          <p className="text-sm mt-8 text-center text-gray-800">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
