import React, { useState, useEffect } from 'react';
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

const EventSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [initialEventsLoaded, setInitialEventsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const springConfig = {
    type: "spring",
    stiffness: 200,
    damping: 20
  };

  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        const response = await fetch('http://localhost:9091/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        // Sort by date and take first 4 events
        const sortedEvents = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);
        
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
      try {
        const response = await fetch('http://localhost:9091/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        const sortedEvents = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4); // Show 4 events when search is cleared
        
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
      // Sort results and limit to 4 events for search results
      const sortedData = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);
      
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
    <div className="h-screen flex flex-col">
      {/* Fixed Search Section */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-2 pb-2 shadow-md">
        {/* Search Input */}
        <div className="relative mb-2 max-w-7xl mx-auto">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by name, description, institute, or tags..."
            className="w-full p-3 rounded-full text-black bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10 pr-10 text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
          />
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 text-xl" />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-100 rounded-full p-1 hover:bg-red-200 transition-colors duration-300"
            >
              <IoIosClose className="text-red-500 text-xl" />
            </button>
          )}
          {isSearching && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
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
              className="text-red-500 mb-2 text-center bg-red-50 p-3 rounded-lg max-w-7xl mx-auto"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scrollable Results Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  className="col-span-full flex justify-center items-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
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
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {event.image && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {event.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span className="bg-purple-50 px-3 py-1 rounded-full">
                          {new Date(event.date).toLocaleDateString()} • {event.time}
                        </span>
                      </div>
                      <div className="text-sm text-purple-600 font-medium mb-2">
                        {event.institute}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {event.tags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors duration-300"
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
                className="text-center text-gray-500 mt-8 p-6 bg-gray-50 rounded-lg"
              >
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-semibold mb-1">No events found</h3>
                <p className="text-sm">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EventSearch;