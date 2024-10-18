import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EventUserContent from "../components/EventUserContent";

const EventUser = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex flex-grow">
      <Sidebar />
      <EventUserContent />
    </div>
  </div>
);

export default EventUser;
