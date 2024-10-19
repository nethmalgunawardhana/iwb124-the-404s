import React, { useState } from 'react';
import { User, Calendar, Cog, MessageSquare, ListTodo } from 'lucide-react';
import Profile from './Profile';
import SettingsContent from './Settingcontent';
import ContactUs from './ContactUs';
import BookedEventsPage from './BookEvent';
import AdminAccessList from './Adminacesslist';

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile />;
      case 'settings':
        return <SettingsContent />;
      case 'contact':
        return <ContactUs />; 
      case 'bookings':
         return <BookedEventsPage />;   
      case 'accesslist':
         return <AdminAccessList/>   
      default:
        return <SettingsContent />;
    }
  };

  return (
    <div className="flex h-full pt-20 overflow-hidden bg-gray-100">
     <aside className="w-64 bg-purple-900 p-4 border-r shadow-lg flex-shrink-0 overflow-y-auto">
        <h2 className="text-xl pt-10 font-semibold mb-6">Settings</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveComponent('profile')}
                className={`flex items-center w-full text-left p-2 rounded transition-colors ${
                  activeComponent === 'profile' ? "bg-white text-black" : ""
                }`}
              >
                <User size={20} className="mr-3" /> My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('settings')}
                className={`flex items-center w-full text-left p-2 rounded transition-colors ${
                  activeComponent === 'settings' ? "bg-white text-black" : ""
                }`}
              >
                <Cog size={20} className="mr-3" /> Settings
              </button>
            </li>
            <li>
              <button onClick={() => setActiveComponent('bookings')}
              className={`flex items-center w-full text-left p-2 rounded transition-colors ${
                activeComponent === 'bookings' ? "bg-white text-black" : ""
              }`}
              >
                <Calendar size={20} className="mr-3" /> Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('contact')}
                className={`flex items-center w-full text-left p-2 rounded transition-colors ${
                  activeComponent === 'contact' ? "bg-white text-black" : ""
                }`}
              >
                <MessageSquare size={20} className="mr-3" /> Contact us
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('accesslist')}
                className={`flex items-center w-full text-left p-2 rounded transition-colors ${
                  activeComponent === 'contact' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ListTodo size={20} className="mr-3" /> Requested List
              </button>
            </li>
          </ul>
        </nav>
       
      </aside>
      <main className="flex-grow  overflow-y-auto bg-gray-50">
        <div className="p-8 ">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;