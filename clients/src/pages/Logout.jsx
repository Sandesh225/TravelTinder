import React from "react";
import { useLogoutUserMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white p-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
