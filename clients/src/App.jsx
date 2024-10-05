import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register"; // Assuming you have a Register component
import Login from "./pages/Login/Login"; // Your login component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TravelPreferencesSetupModal from "./components/Travel/TravelPreferencesSetupModal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/travel-modal" element={<TravelPreferencesSetupModal />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
};

export default App;
