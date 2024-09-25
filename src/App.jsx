import { useState } from 'react'
import LoginPage from './components/login'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className="h-full">
    <LoginPage />
    </div>
    
    </>
  )
}

export default App
