import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarforHomepage from '../components/NavbarforHomepage';
import musicIcon from '../assets/tag-music.png';
import techIcon from '../assets/tag-technology.png';
import artIcon from '../assets/tag-art.png';
import danceIcon from '../assets/tag-dance.png';
import festivalIcon from '../assets/tag-festival.png'
import fashionIcon from '../assets/tag-fashion.png'
import competitionsIcon from '../assets/tag-competitions.png'
import volunteerIcon from '../assets/tag-volunteer.png'
import religiousIcon from '../assets/tag-religious.png'
import workshopIcon from '../assets/tag-workshop.png'
import foodIcon from '../assets/tag-food.png'
import { X, Calendar, MapPin } from 'react-feather';
import Swal from 'sweetalert2';

const BrowseEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('All Institutes');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(20);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const tags = [
    { name: 'Music', image: musicIcon },
    { name: 'Technology', image: techIcon },
    { name: 'Art', image: artIcon },
    { name: 'Dancing', image: danceIcon },
    { name: 'Festival', image: festivalIcon },
    { name: 'Fashion', image: fashionIcon },
    { name: 'Competitions', image: competitionsIcon },
    { name: 'Volunteer', image: volunteerIcon },
    { name: 'Religious', image: religiousIcon },
    { name: 'Workshops', image: workshopIcon },
    { name: 'Food', image: foodIcon },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterAndSortEvents();
  }, [events, selectedInstitute, selectedPayment, selectedTags, sortBy]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:9091/events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events. Please try again later.');
      setLoading(false);
    }
  };

  const filterAndSortEvents = () => {
    let filtered = events.filter((event) => {
      const instituteMatch =
        selectedInstitute === 'All Institutes' || event.institute === selectedInstitute;
      const paymentMatch = selectedPayment === '' || event.payment === selectedPayment;
      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => event.tags.includes(tag));

      return instituteMatch && paymentMatch && tagMatch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'institute':
          return a.institute.localeCompare(b.institute);
        case 'payment':
          return (a.payment === 'free' ? 0 : 1) - (b.payment === 'free' ? 0 : 1);
        case 'date':
        default:
          return new Date(a.date) - new Date(b.date);
      }
    });

    setFilteredEvents(filtered);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const institutes = ['All Institutes', ...new Set(events.map(event => event.institute))];

  const bookEvent = async (eventId) => {
    const result = await Swal.fire({
      title: 'Confirm Booking',
      text: 'Are you sure you want to book this event?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, book it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.post('http://localhost:9091/bookings', { 
          eventId
        });
        
        Swal.fire(
          'Booked!',
          'The event has been successfully booked.',
          'success'
        );
        closeEventDetails();
      } catch (error) {
        Swal.fire(
          'Error!',
          'Failed to book the event. Please try again.',
          'error'
        );
      }
    }
  };

  const EventDetailPopup = ({ event, onClose }) => {
    if (!event) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-purple-800">{event.name}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <img src={event.image} alt={event.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 mb-4">{event.description}</p>
            <p className="text-gray-800 flex items-center mb-2">
              <Calendar className="mr-2" size={18} />
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-gray-800 flex items-center mb-2">
              <MapPin className="mr-2" size={18} />
              <strong>Location:</strong> <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{event.locationLink}</a>
            </p>
            <p className="text-gray-800"><strong>Time:</strong> {event.time}</p>
            <p className="text-gray-800"><strong>Payment:</strong> {event.payment}</p>
            <p className="text-gray-800"><strong>Institute:</strong> {event.institute}</p>
            <p className="text-gray-800"><strong>Organizing Committee:</strong> {event.organizingCommittee}</p>
            <p className="text-gray-800"><strong>Tags:</strong> {event.tags}</p>
            {event.resources && (
              <p className="text-gray-800"><strong>Resources:</strong> {event.resources}</p>
            )}
            <div className="mt-6 flex justify-between">
              <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-block">
                Register Now
              </a>
              <button onClick={() => bookEvent(event.id)} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center mt-20">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarforHomepage />
      <header className="bg-purple-600 text-white py-20 mt-16">
       <div className="max-w-6xl mx-auto text-center">
       <h1 className="text-5xl font-bold">Browse Events</h1>
       <p className="mt-4 text-lg">Find events by institutes, payment options, or tags!</p>
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
              <label className="block font-semibold mb-2 text-gray-800">Select Payment</label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white text-gray-800"
              >
                <option value="">All Payment Types</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="flex-grow">
              <label className="block font-semibold mb-2 text-gray-800">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white text-gray-800"
              >
                <option value="date">Date</option>
                <option value="institute">Institute</option>
                <option value="payment">Payment</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">Select Tags</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
              {tags.map((tag) => (
                <div
                key={tag.name}
                className={`cursor-pointer p-2 rounded-lg border hover:shadow-md transition-shadow ${
                  selectedTags.includes(tag.name) ? 'border-purple-700' : 'border-gray-300'
                }`}
                onClick={() => toggleTag(tag.name)}
              >
                <img src={tag.image} alt={tag.name} className="w-12 h-12 object-cover rounded-md mx-auto" />
                <p className="mt-2 text-center text-gray-800 text-xs">{tag.name}</p>
              </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-center mb-6 text-purple-800">Available Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.slice(0, visibleEvents).map((event) => (
              <div 
                key={event.id} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openEventDetails(event)}
              >
                <img src={event.image} alt={event.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mt-2 text-gray-800 text-center">{event.name}</h3>
                <p className="text-gray-600 text-lg flex items-center mt-2">
                  <Calendar className="mr-2" size={18} />
                  {event.date}
                </p>
                <p className="text-gray-600 text-lg flex items-center mt-2">
                  <MapPin className="mr-2" size={18} />
                  <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Location</a>
                </p>
                <p className="text-gray-600 text-lg">{event.institute}</p>
                <p className="text-gray-600 text-lg font-medium mt-2">{event.payment}</p>
                <p className="text-gray-600 text-sm mt-2">Tags: {event.tags}</p>
              </div>
            ))}
          </div>

          {visibleEvents < filteredEvents.length && (
            <div className="text-center mt-12">
              <button
                className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setVisibleEvents(visibleEvents + 20)}
              >
                Load More Events
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-purple-800 mt-12 p-6 shadow">
       <div className="max-w-6xl mx-auto text-center">
       <p className="text-white">2024 EventUni. All rights reserved.</p>
       </div>
      </footer>

      <EventDetailPopup event={selectedEvent} onClose={closeEventDetails} />
    </div>
  );
};

export default BrowseEventsPage;