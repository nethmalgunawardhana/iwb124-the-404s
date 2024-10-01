import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './components/login'
import SignUpForm from './components/signup'
import FogotPasswordForm from './components/fogotpassword'
import SettingsPage from './pages/Settingspage'
import Verifycode from './components/verifycode'
import EventDetailsCreator from './pages/EventDetailsCreator'

import './App.css'
import Profile from './components/Profile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/fogotpassword" element={<FogotPasswordForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/verifycode" element={<Verifycode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eventdetailscreator" element={<EventDetailsCreator />} />

        </Routes>
      </div>
    </BrowserRouter> 

    {/* <Link to="/eventdetailscreator">Go to Event Details Creator</Link> */}
    </>
  )
}

export default App