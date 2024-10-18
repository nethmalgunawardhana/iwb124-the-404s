import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin } from 'react-feather';

const BookedEventsPage = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookedEvents();
  }, []);

  const fetchBookedEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:9091/bookings');
      const bookings = response.data;
      
      // Fetch event details for each booking
      const eventsPromises = bookings.map(booking => 
        axios.get(`http://localhost:9091/events/${booking.eventId}`)
      );
      const eventsResponses = await Promise.all(eventsPromises);
      const bookedEventsWithDetails = bookings.map((booking, index) => ({
        ...booking,
        eventDetails: eventsResponses[index].data
      }));
      
      setBookedEvents(bookedEventsWithDetails);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch booked events. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading booked events...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      <header className="bg-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Your Booked Events</h1>
          <p className="mt-4 text-lg">Here are the events you've enrolled in!</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookedEvents.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img src={booking.eventDetails.image} alt={booking.eventDetails.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mt-2 text-gray-800 text-center">{booking.eventDetails.name}</h3>
              <p className="text-gray-600 text-lg flex items-center mt-2">
                <Calendar className="mr-2" size={18} />
                {booking.eventDetails.date}
              </p>
              <p className="text-gray-600 text-lg flex items-center mt-2">
                <MapPin className="mr-2" size={18} />
                {booking.eventDetails.locationLink}
              </p>
              <p className="text-gray-600 text-lg">{booking.eventDetails.institute}</p>
              <p className="text-gray-600 text-sm mt-2">Booking ID: {booking.id}</p>
              <p className="text-gray-600 text-sm">Booking Date: {booking.bookingDate || 'Not specified'}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white mt-12 p-6 shadow">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">2024 EventUni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookedEventsPage;