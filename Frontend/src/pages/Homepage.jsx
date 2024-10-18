import React, { useState, useEffect } from 'react';
import { User, Settings, Info, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Insti from '../components/Institutes';
import Footer from '../components/Footer';
import Navbar from "../components/NavbarforHomepage";

const HomePage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:9091/events');
        const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setUpcomingEvents(sortedEvents.slice(0, 4));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />
      <br /><br /><br />
      
      {/* Hero Section */}
      <header className="bg-purple-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 gap-x-28">
          <div className="video-wrapper absolute inset-0 z-0">
            <video autoPlay loop muted className="w-full h-full object-cover">
              <source
                src="https://videos.pexels.com/video-files/7722221/7722221-uhd_2560_1440_25fps.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Discover Amazing Events</h1>
          <p className="mt-4 text-lg">Your one-stop solution for all your event needs!</p>
          <button className="mt-6 px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-200 transition-colors animate-pulse">
            <Link to="/browse-events">Explore Events</Link>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Upcoming Events Section */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-purple-500">Upcoming Events</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 relative">
                {index < 2 && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    NEW
                  </div>
                )}
                <img src={event.image || `https://via.placeholder.com/300x200?text=${event.name}`} alt={event.name} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-lg text-black font-semibold mt-2">{event.name}</h3>
                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Insti />
      <Footer />
    </div>
  );
};

export default HomePage;