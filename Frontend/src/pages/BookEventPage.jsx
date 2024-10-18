import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarforHomepage from '../components/NavbarforHomepage';
import { Calendar, MapPin, Trash2 } from 'react-feather';

const BookedEventsPage = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    fetchBookedEvents();
  }, []);

  const fetchBookedEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:9091/bookings');
      const bookings = response.data;

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

  const handleSelectEvent = (bookingId) => {
    setSelectedEvents(prev => 
      prev.includes(bookingId) 
        ? prev.filter(id => id !== bookingId) 
        : [...prev, bookingId]
    );
  };

  const handleDeleteSelected = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${selectedEvents.length} event(s). This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete them!'
    });

    if (result.isConfirmed) {
      try {
        await Promise.all(selectedEvents.map(bookingId => 
          axios.delete(`http://localhost:9091/bookings/${bookingId}`)
        ));
        fetchBookedEvents(); // Refresh the list after deletion
        setSelectedEvents([]); // Clear selection

        Swal.fire({
          title: 'Deleted!',
          text: 'The selected events have been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete selected events. Please try again.',
          icon: 'error'
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading booked events...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarforHomepage />
      <header className="bg-purple-600 text-white mt-16 py-9">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Your Booked Events</h1>
          <p className="mt-4 text-lg">Here are the events you've enrolled in!</p>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto p-6">
        {selectedEvents.length > 0 && (
          <div className="mb-6">
            <button 
              onClick={handleDeleteSelected}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <Trash2 className="mr-2" size={18} />
              Delete Selected Events ({selectedEvents.length})
            </button>
          </div>
        )}

        {bookedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookedEvents.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              >
                <input 
                  type="checkbox" 
                  checked={selectedEvents.includes(booking.id)}
                  onChange={() => handleSelectEvent(booking.id)}
                  className="absolute top-4 right-4 h-5 w-5 z-10 cursor-pointer"
                />
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
        ) : (
          <div className="text-center text-gray-600">No booked events found.</div>
        )}
      </main>

      <footer className="bg-white p-6 shadow mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">© 2024 EventUni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookedEventsPage;
