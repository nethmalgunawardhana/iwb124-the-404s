import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

import SettingsPage from "./pages/Settingspage";
import Verifycode from "./components/verifycode";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import Profile from "./components/Profile";
import EventDashboard from "./pages/eventdashboard";
import FogotPassword  from "./components/fogotpassword";
import BrowseEventsPage from './pages/BrowseEventsPage';
import { PrivateRoute } from './components/Privateroute';
import Login from './pages/Login';
import SignUpPage from './pages/Signup';

import BookedEventsPage from "./pages/BookEventPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/verifycode" element={<Verifycode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<FogotPassword />} />
          <Route path="/browse-events" element={<BrowseEventsPage />} />

          <Route path="/eventdashboard" element={<EventDashboard />} />
          {/* Add the new route for EventPage */}
          <Route path="/bookedevents" element={<BookedEventsPage />} />

          {/* New route for Event Page */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
