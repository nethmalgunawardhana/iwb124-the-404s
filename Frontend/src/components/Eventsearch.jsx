import React, { useState, useEffect } from 'react';
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { motion, AnimatePresence, useSpring } from 'framer-motion';

const EventSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [initialEventsLoaded, setInitialEventsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Spring animation configuration
  const springConfig = {
    type: "spring",
    stiffness: 200,
    damping: 20
  };

  // Load initial 4 events
  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        const response = await fetch('http://localhost:9091/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        // Sort by date and take first 4
        const sortedEvents = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);
        
        // Add delay with spring animation
        setTimeout(() => {
          setEvents(sortedEvents);
          setInitialEventsLoaded(true);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to fetch initial events');
        setIsLoading(false);
        console.error(err);
      }
    };

    if (!initialEventsLoaded) {
      fetchInitialEvents();
    }
  }, [initialEventsLoaded]);

  const searchEvents = async (query) => {
    if (!query.trim()) {
      // Reset to initial 4 events with spring animation
      try {
        const response = await fetch('http://localhost:9091/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        const sortedEvents = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);
        
        setTimeout(() => {
          setEvents(sortedEvents);
        }, 300);
      } catch (err) {
        setError('Failed to fetch events');
        console.error(err);
      }
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`http://localhost:9091/events/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      // Sort results by date and add delay
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setTimeout(() => {
        setEvents(sortedData);
        setIsSearching(false);
      }, 600);
    } catch (err) {
      setError('Search failed');
      setIsSearching(false);
      console.error(err);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchEvents(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      {/* Search Input */}
      <div className="relative mb-8">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events by name, description, institute, or tags..."
          className="w-full p-4 rounded-full text-black bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12 pr-12 text-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
        />
        <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 text-2xl" />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-100 rounded-full p-1 hover:bg-red-200 transition-colors duration-300"
          >
            <IoIosClose className="text-red-500 text-2xl" />
          </button>
        )}
        {isSearching && (
          <div className="absolute right-14 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 mb-6 text-center bg-red-50 p-4 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              className="col-span-full flex justify-center items-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </motion.div>
          ) : (
            events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={springConfig}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {event.image && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-base mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-purple-50 px-4 py-2 rounded-full">
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </span>
                  </div>
                  <div className="text-base text-purple-600 font-medium mb-4">
                    {event.institute}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-300"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* No Results Message */}
      <AnimatePresence>
        {events.length === 0 && !isSearching && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={springConfig}
            className="text-center text-gray-500 mt-12 p-8 bg-gray-50 rounded-lg"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p>Try adjusting your search criteria</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventSearch;