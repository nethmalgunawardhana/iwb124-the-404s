import React from 'react';
import NavbarforHomepage from '../components/NavbarforHomepage';
import Sidebar from '../components/Sidebar';

const SettingsPage = () => (
  <div className="flex flex-col h-screen">
    <NavbarforHomepage />
    <div className="flex-grow overflow-hidden">
      <Sidebar />
    </div>
  </div>
);

export default SettingsPage;