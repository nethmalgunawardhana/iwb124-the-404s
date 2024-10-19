import React, { useState, useEffect } from 'react';
import { MessageSquare, Bell, Settings, X } from 'lucide-react';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { auth } from '../firebase/firebase';
import EventSearch from './Eventsearch'; // Make sure the import path is correct

const NavbarforHomepage = () => {
  const navigate = useNavigate();
  const { currentUser: globalUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(globalUser);
  const [notifications, setNotifications] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setCurrentUser(globalUser);
    if (globalUser) {
      const hasShownWelcome = sessionStorage.getItem(`welcomeShown_${globalUser.uid}`);
      
      if (!hasShownWelcome) {
        setShowWelcome(true);
        const welcomeNotif = {
          id: Date.now(),
          message: "Welcome to EventUni™!",
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => {
          const welcomeExists = prev.some(notif => notif.message === "Welcome to EventUni™!");
          if (!welcomeExists) {
            return [...prev, welcomeNotif];
          }
          return prev;
        });
        setUnreadCount(prev => prev + 1);
        sessionStorage.setItem(`welcomeShown_${globalUser.uid}`, 'true');
        setTimeout(() => {
          setShowWelcome(false);
        }, 3000);
      }
    }
  }, [globalUser]);

  useEffect(() => {
    if (globalUser) {
      const savedNotifications = localStorage.getItem(`notifications_${globalUser.uid}`);
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications);
        setNotifications(parsedNotifications);
        setUnreadCount(parsedNotifications.filter(n => !n.read).length);
      }
    }
  }, [globalUser]);

  useEffect(() => {
    if (globalUser && notifications.length > 0) {
      localStorage.setItem(`notifications_${globalUser.uid}`, JSON.stringify(notifications));
    }
  }, [notifications, globalUser]);

  const handleLogout = async () => {
    try {
      if (currentUser) {
        sessionStorage.removeItem(`welcomeShown_${currentUser.uid}`);
        localStorage.removeItem(`notifications_${currentUser.uid}`);
      }
      await auth.signOut();
      setCurrentUser(null);
      setNotifications([]);
      setUnreadCount(0);
      setShowNotifications(false);
      setShowSettingsDropdown(false);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((showNotifications || showSettingsDropdown) && 
          !event.target.closest('.notification-panel') && 
          !event.target.closest('.settings-panel') && 
          !event.target.closest('.search-popup')) {
        setShowNotifications(false);
        setShowSettingsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showSettingsDropdown]);

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white border-b fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="flex items-center space-x-4">
          <div onClick={() => navigate('/')} className="text-2xl font-semibold text-purple-600 hover:cursor-pointer">EventUni™</div>
          
          <div className="w-[400px] relative">
            <div className="relative">
              <input
                type="search"
                placeholder="Search Event"
                className="w-full p-4 rounded-full bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={() => setShowSearchPopup(true)}
                readOnly
              />
              <button 
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors duration-300"
                onClick={() => setShowSearchPopup(true)}
              >
                <IoIosSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/browse-events')} className="text-gray-700 hover:text-purple-600 transition-colors duration-300">Find Events</button>
          <button onClick={() => navigate('/bookedevents')} className="text-gray-700 hover:text-purple-600 transition-colors duration-300">My Bookings</button>

          {currentUser ? (
            <div className="flex items-center space-x-2">
              <div className="relative notification-panel">
                <Bell className="text-gray-700 hover:text-purple-600 cursor-pointer" onClick={toggleNotifications} />
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
              <div className="relative settings-panel">
                <Settings className="text-gray-700 hover:text-purple-600 cursor-pointer" onClick={toggleSettingsDropdown} />
                {showSettingsDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                    <button onClick={() => navigate('/settings')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300">
              LOG IN
            </button>
          )}
        </div>
      </nav>

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 relative search-popup">
            <button
              onClick={() => setShowSearchPopup(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <X size={24} />
            </button>
            <EventSearch />
          </div>
        </div>
      )}

      {/* Welcome Notification */}
      {showWelcome && (
        <div className="fixed top-16 right-4 bg-purple-600 text-white p-4 rounded shadow-lg flex items-center space-x-2 animate-fadeIn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <div className="font-bold">Notification</div>
            <div>Welcome to EventUni™!</div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && notifications.length > 0 && (
        <div className="fixed top-16 right-4 bg-white border shadow-lg rounded p-2 min-w-[250px] notification-panel">
          {notifications.map(notif => (
            <div key={notif.id} className="p-3 bg-gray-100 hover:bg-gray-200 text-black border-b last:border-b-0">
              <div className="font-medium">{notif.message}</div>
              <div className="text-xs text-gray-900 mt-1">
                {new Date(notif.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NavbarforHomepage;