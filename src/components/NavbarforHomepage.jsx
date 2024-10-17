import React, { useState, useEffect } from 'react';
import { MessageSquare, Bell, Settings } from 'lucide-react';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { auth } from '../firebase/firebase';

const NavbarforHomepage = () => {
  const navigate = useNavigate();
  const { currentUser: globalUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(globalUser);
  const [notifications, setNotifications] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setCurrentUser(globalUser);
    if (globalUser && !showWelcome) {
      setShowWelcome(true);
      // Add welcome notification
      const welcomeNotif = {
        id: Date.now(),
        message: "Welcome to Eventvibe!",
        timestamp: new Date(),
        read: false
      };
      setNotifications([welcomeNotif]);
      setUnreadCount(1);
      
      setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
    }
  }, [globalUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setNotifications([]);
      setUnreadCount(0);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Mark all notifications as read when opening the notification panel
      const updatedNotifications = notifications.map(notif => ({
        ...notif,
        read: true
      }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    }
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
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {currentUser.displayName ? currentUser.displayName.charAt(0) : currentUser.email.charAt(0)}
            </div>
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
        <div className="fixed top-16 right-4 bg-pink-500 text-white p-4 rounded shadow-lg flex items-center space-x-2 animate-fadeIn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <div className="font-bold">Notification</div>
            <div>Welcome to Eventvibe!</div>
          </div>
        </div>
      )}

      {showNotifications && notifications.length > 0 && (
        <div className="fixed top-16 right-4 bg-white border shadow-lg rounded p-2 min-w-[250px]">
          {notifications.map(notif => (
            <div key={notif.id} className="p-3 bg-gray-300 hover:bg-gray-400 text-black border-b last:border-b-0">
              <div className="font-medium">{notif.message}</div>
              <div className="text-xs text-gray-900 mt-1">
                {new Date(notif.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavbarforHomepage;