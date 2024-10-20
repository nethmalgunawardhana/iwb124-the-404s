import React, { useState, useEffect } from 'react';
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const EventSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [initialEventsLoaded, setInitialEventsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

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

  const handleBooking = async (eventId) => {
    setIsBooking(true);
    try {
      const response = await fetch('http://localhost:9091/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          userId: 'user123' // Replace with actual user ID from your auth system
        }),
      });

      if (!response.ok) throw new Error('Booking failed');
      const data = await response.json();
      toast.success('Event booked successfully!');
      setSelectedEvent(null);
    } catch (err) {
      toast.error('Failed to book event');
      console.error(err);
    } finally {
      setIsBooking(false);
    }
  };

  // Event Modal Component
  const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative">
            {event.image && (
              <div className="h-64 relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <IoIosClose className="text-2xl" />
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Event Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Date:</span> {event.date}</p>
                  <p><span className="font-medium">Time:</span> {event.time}</p>
                  <p><span className="font-medium">Institute:</span> {event.institute}</p>
                  <p><span className="font-medium">Payment:</span> {event.payment}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Organizer</h3>
                <p>{event.organizingCommittee}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-purple-700 transition-colors"
              >
                Register Now
              </a>
              <button
                onClick={() => handleBooking(event.id)}
                disabled={isBooking}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                {isBooking ? 'Booking...' : 'Book Now'}
              </button>
            </div>

            {event.locationLink && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
                <a
                  href={event.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View on Google Maps
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Search Section */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-2 pb-2 shadow-md">
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
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
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

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventSearch;