import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarforHomepage from '../components/NavbarforHomepage';
import { Calendar, MapPin, Trash2, Clock, Tag, CreditCard, Users } from 'react-feather';

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
      // First get all bookings
      const bookingsResponse = await axios.get('http://localhost:9091/bookings');
      const bookings = bookingsResponse.data;

      // Then fetch event details for each booking
      const eventsWithDetails = await Promise.all(
        bookings.map(async (booking) => {
          try {
            const eventResponse = await axios.get(`http://localhost:9091/events/${booking.eventId}`);
            return {
              ...booking,
              eventDetails: eventResponse.data
            };
          } catch (err) {
            console.error(`Failed to fetch event details for booking ${booking.id}:`, err);
            return {
              ...booking,
              eventDetails: { name: 'Event details not available', error: true }
            };
          }
        })
      );

      setBookedEvents(eventsWithDetails);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch booked events. Please try again later.');
      setLoading(false);
      console.error('Error fetching booked events:', err);
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
      text: `You are about to delete ${selectedEvents.length} booking(s). This action cannot be undone.`,
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
        
        await fetchBookedEvents();
        setSelectedEvents([]);

        Swal.fire({
          title: 'Deleted!',
          text: 'The selected bookings have been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (err) {
        console.error('Error deleting bookings:', err);
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete selected bookings. Please try again.',
          icon: 'error'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-purple-600">Loading your booked events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarforHomepage />
      
      <header className="bg-purple-600 text-white mt-16 py-9">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Your Booked Events</h1>
          <p className="mt-4 text-lg">Manage your event bookings and registrations</p>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto p-6">
        {selectedEvents.length > 0 && (
          <div className="mb-6">
            <button 
              onClick={handleDeleteSelected}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-300"
            >
              <Trash2 className="mr-2" size={18} />
              Delete Selected Bookings ({selectedEvents.length})
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
                
                <img 
                  src={booking.eventDetails.image || '/placeholder-event.jpg'} 
                  alt={booking.eventDetails.name} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.src = '/placeholder-event.jpg';
                  }}
                />

                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {booking.eventDetails.name}
                </h3>

                <div className="space-y-2">
                  <p className="text-gray-600 flex items-center">
                    <Calendar className="mr-2" size={16} />
                    {booking.eventDetails.date}
                  </p>
                  
                  <p className="text-gray-600 flex items-center">
                    <Clock className="mr-2" size={16} />
                    {booking.eventDetails.time}
                  </p>

                  <p className="text-gray-600 flex items-center">
                    <MapPin className="mr-2" size={16} />
                    {booking.eventDetails.locationLink}
                  </p>

                  <p className="text-gray-600 flex items-center">
                    <Users className="mr-2" size={16} />
                    {booking.eventDetails.organizingCommittee}
                  </p>

                  <p className="text-gray-600 flex items-center">
                    <CreditCard className="mr-2" size={16} />
                    Payment: {booking.eventDetails.payment}
                  </p>

                  {booking.eventDetails.tags && (
                    <p className="text-gray-600 flex items-center">
                      <Tag className="mr-2" size={16} />
                      {booking.eventDetails.tags}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                  <p className="text-sm text-gray-500">Booked on: {booking.bookingDate}</p>
                  {booking.userId && (
                    <p className="text-sm text-gray-500">User ID: {booking.userId}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No booked events found.</p>
            <p className="mt-2 text-gray-500">Your bookings will appear here once you register for events.</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">© 2024 EventUni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookedEventsPage;