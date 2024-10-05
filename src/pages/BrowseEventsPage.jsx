import React, { useState } from 'react';

const BrowseEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  const tags = ['Music', 'Art', 'Technology', 'Sports', 'Networking'];
  const events = [
    { image: 'https://via.placeholder.com/300x200?text=Event+1', title: 'Music Fest', date: 'October 12, 2024', tags: ['Music'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+2', title: 'Tech Expo', date: 'November 15, 2024', tags: ['Technology'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+3', title: 'Art Gala', date: 'December 20, 2024', tags: ['Art'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+4', title: 'Sports Meet', date: 'January 10, 2025', tags: ['Sports'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+5', title: 'Business Networking', date: 'February 20, 2025', tags: ['Networking'] },
  ];

  const filteredEvents = events.filter(event => 
    selectedTag ? event.tags.includes(selectedTag) : 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Browse Events</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Browse by Tags</h3>
        <div className="flex space-x-4">
          {tags.map(tag => (
            <button
              key={tag}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Search by Name</h3>
        <input
          type="text"
          className="px-4 py-2 bg-white text-purple-600 border rounded-lg w-full mb-4"
          placeholder="Enter event name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseEventsPage;
