import React, { useState } from 'react';
import { User, Calendar, Cog, MessageSquare, LogOut } from 'lucide-react';
import Profile from './Profile';
import SettingsContent from './Settingcontent';

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState('settings');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <SettingsContent />;
    }
  };

  return (
    <div className="flex h-screen overflow-clip bg-gray-100">
      <aside className="w-64 bg-white p-4 border-r shadow-lg flex-shrink">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveComponent('profile')}
                className={`flex items-center w-full text-left p-2 rounded transition-colors ${
                  activeComponent === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={20} className="mr-3" /> My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('settings')}
                className={`flex items-center w-full text-left p-2 rounded transition-colors ${
                  activeComponent === 'settings' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Cog size={20} className="mr-3" /> Settings
              </button>
            </li>
            <li>
              <button className="flex items-center w-full text-left p-2 rounded text-gray-700 hover:bg-gray-100 transition-colors">
                <Calendar size={20} className="mr-3" /> Bookings
              </button>
            </li>
            <li>
              <button className="flex items-center w-full text-left p-2 rounded text-gray-700 hover:bg-gray-100 transition-colors">
                <MessageSquare size={20} className="mr-3" /> Contact us
              </button>
            </li>
          </ul>
        </nav>
        <button className="flex items-center text-gray-700 mt-8 p-2 rounded hover:bg-gray-100 transition-colors w-full">
          <LogOut size={20} className="mr-3" /> Logout
        </button>
      </aside>
      <main className="flex-grow  overflow-y-auto bg-gray-50">
        <div className="p-8 w-full h-full">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;