import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserList from "./UserList/UserList";
import Logout from "./pages/Logout/Logout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProfileSetup from "./Profile/ProfileSetup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const App = () => (
  <Router>
    <Navbar />
    <main className="bg-background-light min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/profile" element={<ProfileSetup />} />
      </Routes>
    </main>
    <Footer />
    <ToastContainer position="top-center" />
  </Router>
);

export default App;
