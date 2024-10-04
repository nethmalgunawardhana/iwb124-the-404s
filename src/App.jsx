import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login';
import SignUpForm from './components/signup';
import FogotPasswordForm from './components/fogotpassword';
import SettingsPage from './pages/Settingspage';
import Verifycode from './components/verifycode';
import HomePage from './pages/HomePage'; // Import HomePage component
import Profile from './components/Profile';
import EventCreator from "./pages/EventCreator";
import EventEdit from "./components/EventEdit";
import EventDashboard from './pages/eventdashboard';
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (

    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Set HomePage as the landing route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/fogotpassword" element={<FogotPasswordForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/verifycode" element={<Verifycode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eventcreator" element={<EventCreator />} />
          <Route path="/evenedit" element={<EventEdit />} />
          <Route path="/eventdashboard" element={<EventDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
