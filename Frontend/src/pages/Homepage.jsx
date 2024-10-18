import React, { useState, useEffect } from 'react';
import { User, Settings, Info, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

import Insti from '../components/Institutes'
import Footer from '../components/Footer'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "../components/NavbarforHomepage"


const HomePage = () => {
  const [browseOption, setBrowseOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [randomEvents, setRandomEvents] = useState([]);

  const tags = ['Music', 'Art', 'Technology', 'Sports', 'Networking'];
  const events = [
    { image: 'https://via.placeholder.com/300x200?text=Event+1', title: 'Music Fest', date: 'October 12, 2024', tags: ['Music'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+2', title: 'Tech Expo', date: 'November 15, 2024', tags: ['Technology'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+3', title: 'Art Gala', date: 'December 20, 2024', tags: ['Art'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+4', title: 'Sports Meet', date: 'January 10, 2025', tags: ['Sports'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+5', title: 'Business Networking', date: 'February 20, 2025', tags: ['Networking'] },
  ];

  const getRandomEvents = () => {
    const shuffledEvents = events.sort(() => 0.5 - Math.random());
    setRandomEvents(shuffledEvents.slice(0, 4));
  };

  useEffect(() => {
    getRandomEvents();
    const intervalId = setInterval(getRandomEvents, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    const filtered = events.filter((event) => event.tags.includes(tag));
    setFilteredEvents(filtered);
  };

  const handleSearch = () => {
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };


  return (

    <div className="min-h-screen bg-gray-50 relative">
      
      {/* Hero Section */}
      <header className="bg-purple-600 text-white py-20 relative overflow-hidden">
        {/*added nav bar*/}
    <div className='z-50'>
    < Navbar />
    </div>
      
      
      <br /><br /><br />
      <div className="absolute inset-0  gap-x-28">
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
        <div className="relative  max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Discover Amazing Events</h1>
          <p className="mt-4 text-lg">Your one-stop solution for all your event needs!</p>
          <button className="mt-6 px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-200 transition-colors animate-pulse">
            <Link to="/browse-events">Explore Events</Link>
          </button>
        </div>
      </header>

      {/* Browse Events Section */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Browse Events</h2>
        <div className="relative inline-block">
          <button
            onClick={() => setBrowseOption(browseOption ? null : 'browse')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors flex items-center"
          >
            Browse Events <ChevronDown className="ml-2" />
          </button>
          {browseOption && (
            <div className="absolute mt-2 bg-white shadow-lg rounded-lg w-48">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setBrowseOption('tags')}
              >
                By Tags
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setBrowseOption('name')}
              >
                By Name
              </button>
            </div>
          )}
        </div>

        {/* Browse by Tags */}
        {browseOption === 'tags' && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Browse by Tags</h3>
            <div className="flex space-x-4">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search by Name */}
        {browseOption === 'name' && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Search by Name</h3>
            <input
              type="text"
              className="px-4 py-2 bg-white text-purple-600 border rounded-lg w-full mb-4"
              placeholder="Enter event name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        )}

        {/* Filtered Events */}
        {filteredEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-purple-500">Filtered Events</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{filteredEvents.map((event, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
              </div>
            ))}</div>



          </div>
        )}

        {/* Random Events Section */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-purple-500">Available Events</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomEvents.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
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
