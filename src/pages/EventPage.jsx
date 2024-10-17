import React from 'react';
import EventCard from '../components/EventCard';

const EventPage = () => {
  const eventDetails = {
    title: "Intro to Starting a Travel Agency",
    subtitle: "Barnes Travel",
    description: "This seminar will leave you confident and ready to start your digital travel agency from home.",
    date: "Every Tuesday",
    time: "10:00 AM - NOON",
    location: "Alverno College, 3401 S. 39TH STREET, MILWAUKEE, WI.",
    imageUrl: "/api/placeholder/800/600", // Placeholder image
    registrationUrl: "https://www.sggngroup.com/liveyourdreams"
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Event</h1>
      <EventCard {...eventDetails} />
    </div>
  );
};

export default EventPage;