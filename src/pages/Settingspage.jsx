import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const SettingsPage = () => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex-grow overflow-hidden">
      <Sidebar />
    </div>
  </div>
);

export default SettingsPage;