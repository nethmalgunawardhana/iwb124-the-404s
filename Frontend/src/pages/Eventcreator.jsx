import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EventCreatorContent from "../components/EventCreatorContent";

const EventCreator = () => (
  <div className="flex flex-col min-h-screen">
    <div className="flex flex-grow">
      <EventCreatorContent />
    </div>
  </div>
);

export default EventCreator;
