import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import EventDetailsUserContent from '../components/EventDetailsUserContent';

const EventDetailsCreator = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex flex-grow">
      <Sidebar />
      <EventDetailsUserContent/>
    </div>
  </div>
);

export default EventDetailsUser;