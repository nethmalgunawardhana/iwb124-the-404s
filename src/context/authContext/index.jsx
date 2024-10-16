import React, { useEffect } from "react";
import { auth } from "../../firebase/firebaset";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext =React.createContext();
export function useAuth(){
  return useContext(AuthContext);
}
export function AuthProvider({children}){

  const[loading, setLoading]=useState(true);
  const[currentUser, setCurrentUser]=useState(null);
  const[userLoggedIn,setUserLoggedIn]=useState(false);

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, initializeUser);
 
    return unsubscribe;
  },[]);
 
  async function initializeUser(user){
    if(user){
      setCurrentUser(...user);
      setUserLoggedIn(true);
    }else{
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }
  const value={
    currentUser,
    userLoggedIn,
    loading
  }

  return(
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  ) 
}
