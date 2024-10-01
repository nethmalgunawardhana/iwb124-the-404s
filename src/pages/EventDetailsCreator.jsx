import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import EventDetailsCreatorContent from '../components/EventDetailsCreatorContent';

const EventDetailsCreator = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex flex-grow">
      <Sidebar />
      <EventDetailsCreatorContent/>
    </div>
  </div>
);

export default EventDetailsCreator;