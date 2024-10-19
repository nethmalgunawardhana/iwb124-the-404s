import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/authContext';
import FogotPasswordForm from "./components/fogotpassword";
import SettingsPage from "./pages/Settingspage";
import Verifycode from "./components/verifycode";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import Profile from "./components/Profile";
import EventCreator from "./pages/EventCreator";
import EventEdit from "./components/EventEdit";
import AccountVerification from "./pages/Verification";
import EventDashboard from "./pages/eventdashboard";
import OrganizationVerification from "./pages/org-verify";
import PVerification from "./pages/person-verify";
import AdminDashboard from "./pages/Admin/admindashboard";
import BrowseEventsPage from './pages/BrowseEventsPage';
import { PrivateRoute } from './components/Privateroute';
import Login from './pages/Login'; 
import SignUpPage from './pages/Signup';
import EventPage from './pages/EventPage'; // Import the new EventPage component
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
          <Route path="/fogotpassword" element={<FogotPasswordForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/verifycode" element={<Verifycode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eventcreator" element={<EventCreator />} />
          <Route path="/browse-events" element={<BrowseEventsPage />} />
          <Route path="/evenedit" element={<EventEdit />} />
          <Route path="/verify" element={<AccountVerification />} />
          <Route path="/eventdashboard" element={
          
              <EventDashboard />
         
          } />
          <Route path="/organization-verification" element={<OrganizationVerification />} />

          <Route path="/personal-verification" element={<PVerification />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Add the new route for EventPage */}
          <Route path="/event-page" element={<EventPage />} />
          <Route path="/bookedevents" element={<BookedEventsPage />} />
         
           {/* New route for Event Page */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;