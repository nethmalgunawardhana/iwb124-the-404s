import React, { useState, useEffect } from 'react';
import { MessageSquare, Bell, Settings } from 'lucide-react';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { auth } from '../firebase/firebase';

const NavbarforHomepage = () => {
  const navigate = useNavigate();
  const { currentUser: globalUser } = useAuth(); // Use from global context
  const [currentUser, setCurrentUser] = useState(globalUser);
  const [notifications, setNotifications] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  useEffect(() => {
    setCurrentUser(globalUser); // Sync with global auth user when component loads
  }, [globalUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null); // Reset the currentUser state
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  return (
    <nav className="flex justify-between items-center p-2 bg-white border-b fixed top-0 left-0 right-0 z-10">
      <div className="flex space-x-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="text-2xl font-semibold text-orange-600">eventbrite &emsp; </div>
          </div>

          <div className="flex items-center space-x-4">
            <form className="w-[400px] relative">
              <div className="relative">
                <input type="Search" placeholder="Search Event" className="w-full p-4 rounded-full bg-white border-2 border-slate-150" />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-orange-600 rounded-full text-white hover:bg-orange-700 transition-colors duration-300">
                  <IoIosSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors duration-300">Find Events</a>
        <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors duration-300">Find my tickets</a>

        {currentUser ? (
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell 
                className="text-gray-700 hover:text-orange-600 cursor-pointer" 
                onClick={toggleNotifications}
              />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {notifications.length}
                </span>
              )}
            </div>
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {currentUser.displayName ? currentUser.displayName.charAt(0) : currentUser.email.charAt(0)}
            </div>
            {/* Added text-black to make the username color black */}
            <span className="text-black">{currentUser.displayName || currentUser.email}</span>
            <div className="relative">
              <Settings
                className="text-gray-700 hover:text-orange-600 cursor-pointer"
                onClick={toggleSettingsDropdown}
              />
              {showSettingsDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            LOG IN
          </button>
        )}
      </div>

      {showWelcome && (
        <div className="fixed top-16 right-4 bg-pink-500 text-white p-2 rounded shadow-lg">
          Welcome to LinkR - RotaractMora
        </div>
      )}

      {showNotifications && (
        <div className="fixed top-16 right-4 bg-white border shadow-lg rounded p-2">
          {notifications.map(notif => (
            <div key={notif.id} className="p-2 hover:bg-gray-100">
              {notif.message}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavbarforHomepage;
