import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserList from "./UserList/UserList";
import Logout from "./pages/Logout/Logout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserForm from "./UserList/UserForm";
import ProfileSetup from "./Profile/ProfileSetup";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/profile" element={<ProfileSetup />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
