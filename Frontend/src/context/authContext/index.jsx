import React, { useEffect, useState, useContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a saved auth state in localStorage
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setUserLoggedIn(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
        setUserLoggedIn(true);
        // Save auth state
        localStorage.setItem('authUser', JSON.stringify(user));
      } else {
        // User is signed out
        setCurrentUser(null);
        setUserLoggedIn(false);
        // Clear auth state
        localStorage.removeItem('authUser');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Add logout function
  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setUserLoggedIn(false);
      localStorage.removeItem('authUser');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    setCurrentUser,
    setUserLoggedIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}