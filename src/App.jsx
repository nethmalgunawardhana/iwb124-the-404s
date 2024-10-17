
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import SignUpForm from "./components/signup";
import FogotPasswordForm from "./components/fogotpassword";
import SettingsPage from "./pages/Settingspage";
import Verifycode from "./components/verifycode";
import HomePage from "./pages/HomePage"; // Import HomePage component
import Profile from "./components/Profile";
import EventCreator from "./pages/EventCreator";
import EventEdit from "./components/EventEdit";
import AccountVerification from "./pages/Verification";
import EventDashboard from "./pages/eventdashboard";
import OrganizationVerification from "./pages/org-verify";
import PVerification from "./pages/person-verify";
import AdminDashboard from "./pages/Admin/admindashboard";
import BrowseEventsPage from './pages/BrowseEventsPage';
import { AuthProvider } from './context/authContext';
import { PrivateRoute } from './components/Privateroute';
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
    <BrowserRouter>
      <div>
        <Routes>

          <Route path="/" element={<HomePage />} /> {/* HomePage is the landing route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/fogotpassword" element={<FogotPasswordForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/verifycode" element={<Verifycode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eventcreator" element={<EventCreator />} />
          <Route path="/browse-events" element={<BrowseEventsPage />} /> {/* Add Browse Events Page route */}
          <Route path="/evenedit" element={<EventEdit />} />
          <Route path="/verify" element={<AccountVerification />} />
          <Route path="/eventdashboard" element={ <PrivateRoute>
            <EventDashboard />
            </PrivateRoute>
          } />
          <Route
            path="/organization-verification"
            element={<OrganizationVerification />}
          />
          <Route path="/personal-verification" element={<PVerification />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
