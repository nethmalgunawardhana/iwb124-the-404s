import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './components/login'
import SignUpForm from './components/signup'
import SettingsPage from './pages/Settingspage'
import EventDetailsCreator from './pages/EventDetailsCreator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/eventdetailscreator" element={<EventDetailsCreator />} />
        </Routes>
      </div>
    </BrowserRouter> 

    {/* <Link to="/eventdetailscreator">Go to Event Details Creator</Link> */}
    </>
  )
}

export default App