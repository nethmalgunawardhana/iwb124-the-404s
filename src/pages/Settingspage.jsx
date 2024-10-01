import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SettingsContent from '../components/Settingcontent';

const SettingsPage = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex flex-grow">
      <Sidebar />
      <SettingsContent />
    </div>
  </div>
);

export default SettingsPage;