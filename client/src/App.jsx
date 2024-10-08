import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./components/Home";
import HeroSection from "./components/Hero/HeroSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SwipeableCard from "./components/TravelCard/SwipeableCard/SwipeableCard";
import TravelPreferencesForm from "./components/Travel/TravelPreferencesForm";
import UserTravelPreferences from "./components/Travel/UserTravelPreferences";
import UpdateTravelPreferencesForm from "./components/Travel/UpdateTravelPreferencesForm";
import ProfileCard from "./components/Profile/ProfileCard";
import ProfileList from "./components/Profile/ProfileList";
import ProfileSetup from "./components/Profile/ProfileSetup";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HeroSection />} />
        <Route path="/explore" element={<SwipeableCard />} />
        <Route path="/travel-form" element={<TravelPreferencesForm />} />
        <Route path="/travel-profile" element={<UserTravelPreferences />} />
        <Route
          path="/update-travel"
          element={<UpdateTravelPreferencesForm />}
        />
        <Route path="/card" element={<ProfileSetup />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
};

export default App;
