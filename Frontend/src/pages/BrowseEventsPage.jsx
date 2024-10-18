import React, { useState } from 'react';
import NavbarforHomepage from '../components/NavbarforHomepage';
import musicIcon from '../assets/tag-music.png';
import techIcon from '../assets/tag-technology.png';
import artIcon from '../assets/tag-art.png';
import danceIcon from '../assets/tag-dance.png';
import { X } from 'react-feather'; // Make sure to import the X icon

const BrowseEventsPage = () => {
  // Sample events data
  const allEvents = [
    { image: 'https://via.placeholder.com/300x200?text=Event+1', title: 'Music Fest', date: 'October 12, 2024', institute: 'Institute 1', price: 'free', tags: ['Music'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+2', title: 'Tech Expo', date: 'November 15, 2024', institute: 'Institute 2', price: 'paid', tags: ['Technology'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+3', title: 'Art Gala', date: 'December 20, 2024', institute: 'Institute 1', price: 'free', tags: ['Art'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+4', title: 'Dance Show', date: 'January 10, 2025', institute: 'Institute 2', price: 'paid', tags: ['Dancing'] },
    // Add more events...
  ];

  const institutes = ['All Institutes', 'Institute 1', 'Institute 2', 'Institute 3'];
  const [selectedInstitute, setSelectedInstitute] = useState('All Institutes');
  const [price, setPrice] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(20);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event

  const tags = [
    { name: 'Music', image: musicIcon },
    { name: 'Technology', image: techIcon },
    { name: 'Art', image: artIcon },
    { name: 'Dancing', image: danceIcon },
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? [] : [tag]));
  };

  const filteredEvents = allEvents.filter((event) => {
    const instituteMatch =
      selectedInstitute === 'All Institutes' || event.institute === selectedInstitute;
    const priceMatch = price === '' || event.price === price;
    const tagMatch = selectedTags.length === 0 || event.tags.includes(selectedTags[0]);

    return instituteMatch && priceMatch && tagMatch;
  });

  const openEventDetails = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const EventDetailPopup = ({ event, onClose }) => {
    if (!event) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-purple-800">{event.title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 mb-2">Event description goes here.</p>
            <p className="text-gray-800"><strong>Date:</strong> {event.date}</p>
            <p className="text-gray-800"><strong>Institute:</strong> {event.institute}</p>
            <p className="text-gray-800"><strong>Price:</strong> {event.price === 'free' ? 'Free' : 'Paid'}</p>
            {/* Add other event details if needed */}
            <div className="mt-6">
              <a href="#" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-block">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarforHomepage />
      <header className="bg-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Browse Events</h1>
          <p className="mt-4 text-lg">Find events by institutes, pricing, or tags!</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6 text-purple-800">Filter Events</h2>
          <div className="flex justify-between mb-4 space-x-4">
            <div className="flex-grow">
              <label className="block font-semibold mb-2 text-gray-800">Select Institute</label>
              <select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white text-gray-800"
              >
                {institutes.map((institute) => (
                  <option key={institute} value={institute}>
                    {institute}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <label className="block font-semibold mb-2 text-gray-800">Select Price</label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white text-gray-800"
              >
                <option value="">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-purple-800">Select Tags</h3>
            <div className="flex space-x-4">
              {tags.map((tag) => (
                <div
                  key={tag.name}
                  className={`cursor-pointer p-4 rounded-lg border hover:shadow-md transition-shadow ${selectedTags.includes(tag.name) ? 'border-purple-700' : 'border-gray-300'}`}
                  onClick={() => toggleTag(tag.name)}
                >
                  <img src={tag.image} alt={tag.name} className="w-24 h-24 object-cover rounded-md" />
                  <p className="mt-2 text-center text-gray-800">{tag.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-center mb-6 text-purple-800">Available Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.slice(0, visibleEvents).map((event, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openEventDetails(event)}
              >
                <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mt-2 text-gray-800">{event.title}</h3>
                <p className="text-gray-600 text-lg">{event.date}</p>
                <p className="text-gray-600 text-lg">{event.institute}</p>
                <p className="text-gray-600 text-lg font-medium mt-2">{event.price === 'free' ? 'Free' : 'Paid'}</p>
              </div>
            ))}
          </div>

          {visibleEvents < filteredEvents.length && (
            <div className="text-center mt-12">
              <button
                className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors"
                onClick={() => setVisibleEvents(visibleEvents + 20)}
              >
                Load More Events
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white mt-12 p-6 shadow">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">2024 EventUni. All rights reserved.</p>
        </div>
      </footer>

      <EventDetailPopup event={selectedEvent} onClose={closeEventDetails} />
    </div>
  );
};

export default BrowseEventsPage;
