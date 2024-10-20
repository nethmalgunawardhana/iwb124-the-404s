import React, { useState, useEffect } from 'react';
import { MessageSquare, Bell, Settings, X, User, LogOut } from 'lucide-react';
import { IoIosSearch } from "react-icons/io";
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { auth } from '../firebase/firebase';
import EventSearch from './Eventsearch';

const NavbarforHomepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser: globalUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(globalUser);
  const [notifications, setNotifications] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Handle initial mount and user changes
  useEffect(() => {
    if (globalUser && isInitialMount) {
      const checkAndShowWelcome = async () => {
        try {
          // Check if this is a new login session
          const lastLoginTime = sessionStorage.getItem(`lastLogin_${globalUser.uid}`);
          const currentTime = new Date().getTime();
          
          // Show welcome message if it's a new session (more than 1 hour gap)
          if (!lastLoginTime || (currentTime - parseInt(lastLoginTime)) > 3600000) {
            setShowWelcome(true);
            
            // Add welcome notification
            const welcomeNotif = {
              id: Date.now(),
              message: "Welcome to EventUni™!",
              timestamp: new Date(),
              read: false
            };
            
            setNotifications(prev => {
              const welcomeExists = prev.some(notif => 
                notif.message === "Welcome to EventUni™!" && 
                (new Date() - new Date(notif.timestamp)) < 3600000
              );
              if (!welcomeExists) {
                return [...prev, welcomeNotif];
              }
              return prev;
            });
            
            setUnreadCount(prev => prev + 1);
            
            // Update last login time
            sessionStorage.setItem(`lastLogin_${globalUser.uid}`, currentTime.toString());
            
            // Hide welcome message after 3 seconds
            setTimeout(() => {
              setShowWelcome(false);
            }, 3000);
          }
        } catch (error) {
          console.error("Error showing welcome message:", error);
        }
      };

      checkAndShowWelcome();
      setIsInitialMount(false);
    }
  }, [globalUser, isInitialMount]);

  // Load saved notifications
  useEffect(() => {
    if (globalUser) {
      try {
        const savedNotifications = localStorage.getItem(`notifications_${globalUser.uid}`);
        if (savedNotifications) {
          const parsedNotifications = JSON.parse(savedNotifications);
          setNotifications(parsedNotifications);
          setUnreadCount(parsedNotifications.filter(n => !n.read).length);
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    }
  }, [globalUser]);

  // Save notifications when they change
  useEffect(() => {
    if (globalUser && notifications.length > 0) {
      try {
        localStorage.setItem(`notifications_${globalUser.uid}`, JSON.stringify(notifications));
      } catch (error) {
        console.error("Error saving notifications:", error);
      }
    }
  }, [notifications, globalUser]);

  // Update current user when global user changes
  useEffect(() => {
    setCurrentUser(globalUser);
  }, [globalUser]);

  const handleLogout = async () => {
    try {
      if (currentUser) {
        // Clear session storage
        sessionStorage.removeItem(`lastLogin_${currentUser.uid}`);
        localStorage.removeItem(`notifications_${currentUser.uid}`);
      }
      await auth.signOut();
      setCurrentUser(null);
      setNotifications([]);
      setUnreadCount(0);
      setShowNotifications(false);
      setShowSettingsDropdown(false);
      setIsInitialMount(true); // Reset initial mount state
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

  // Handle clicking outside of panels
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
  const isActiveRoute = (path) => location.pathname === path;
  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white border-b fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => navigate('/')} 
            className="text-2xl font-semibold text-purple-600 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            EventUni™
          </div>
          
          <div className="w-[400px] relative">
            <div className="relative group">
              <input
                type="search"
                placeholder="Search Event"
                className="w-full p-4 rounded-full bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 group-hover:shadow-md"
                onClick={() => setShowSearchPopup(true)}
                readOnly
              />
              <button 
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                onClick={() => setShowSearchPopup(true)}
              >
                <IoIosSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative group">
            <button 
              onClick={() => navigate('/browse-events')} 
              className={`text-gray-700 hover:text-purple-600 transition-colors duration-300 relative py-2 ${
                isActiveRoute('/browse-events') ? 'text-purple-600' : ''
              }`}
            >
              Find Events
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              {isActiveRoute('/browse-events') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
              )}
            </button>
          </div>

          <div className="relative group">
            <button 
              onClick={() => navigate('/bookedevents')} 
              className={`text-gray-700 hover:text-purple-600 transition-colors duration-300 relative py-2 ${
                isActiveRoute('/bookedevents') ? 'text-purple-600' : ''
              }`}
            >
              My Bookings
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              {isActiveRoute('/bookedevents') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
              )}
            </button>
          </div>

          {currentUser ? (
            <div className="flex items-center space-x-4">
              <div className="relative notification-panel group">
                <Bell 
                  className="text-gray-700 hover:text-purple-600 cursor-pointer transform hover:scale-110 transition-all duration-300" 
                  onClick={toggleNotifications} 
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center transform hover:scale-110 transition-all duration-300">
                {currentUser.displayName ? currentUser.displayName.charAt(0) : currentUser.email.charAt(0)}
              </div>
              <span className="text-black">{currentUser.displayName || currentUser.email}</span>
              <div className="relative settings-panel">
                <Settings 
                  className="text-gray-700 hover:text-purple-600 cursor-pointer transform hover:rotate-90 transition-all duration-300" 
                  onClick={toggleSettingsDropdown} 
                />
                {showSettingsDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20 animate-fadeIn">
                    <button 
                      onClick={() => navigate('/settings')} 
                      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                        isActiveRoute('/settings') ? 'bg-purple-50 text-purple-600' : ''
                      }`}
                    >
                      <User size={18} className="mr-2" />
                      Profile
                    </button>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              LOG IN
            </button>
          )}
        </div>
      </nav>
      {showSearchPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
    <div className="bg-white rounded-lg w-full max-w-4xl mx-4 relative search-popup">
      {/* Close button positioned absolutely in the top-right corner */}
      <div className="absolute top-4 right-4 z-[999]">
        <button
          onClick={() => setShowSearchPopup(false)}
          className="flex items-center justify-center w-8 h-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
          aria-label="Close search"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>
      {/* Add padding to prevent content from overlapping with the close button */}
      <div className="pt-12">
        <EventSearch />
      </div>
    </div>
  </div>
)}

      {/* Welcome Notification */}
      {showWelcome && (
        <div className="fixed top-16 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fadeIn z-50">
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
        <div className="fixed top-16 right-4 bg-white border shadow-lg rounded-lg p-2 min-w-[250px] notification-panel z-40 animate-fadeIn">
          {notifications.map(notif => (
            <div 
              key={notif.id} 
              className="p-3 bg-gray-50 hover:bg-gray-100 text-black border-b last:border-b-0 transition-colors duration-200 rounded-md"
            >
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