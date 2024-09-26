import { useState } from 'react'
import LoginPage from './components/login'
import SignUpForm from './components/signup'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className="h-full">

     <SignUpForm  />
    </div>
    
    </>
  )
}

export default App
