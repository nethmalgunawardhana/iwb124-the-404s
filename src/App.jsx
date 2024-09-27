import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/login'
import SignUpForm from './components/signup'
import SettingsPage from './pages/Settingspage'
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
        </Routes>
      </div>
    </BrowserRouter> 
   
    </>
  )
}

export default App