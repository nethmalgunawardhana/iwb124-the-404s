import React from 'react';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

const EventCard = ({ title, subtitle, description, date, time, location, imageUrl, registrationUrl }) => {
  return (
    <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Left side - Text content */}
      <div className="w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">{title}</h2>
          <h3 className="text-xl font-semibold text-blue-500 mb-4">{subtitle}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-2" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        <a 
          href={registrationUrl} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Register Now
          <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      
      {/* Right side - Image */}
      <div className="w-1/2">
        <img src={imageUrl} alt="Event location" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

const App = () => {
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
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 p-4">
        <h1 className="text-white text-2xl font-bold">Event Showcase</h1>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Featured Event</h2>
        <EventCard {...eventDetails} />
      </main>
    </div>
  );
};

export default App;