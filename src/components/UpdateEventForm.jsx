import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, Image, Link, FileText, Mic, DollarSign } from 'lucide-react';

const UpdateEventForm = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    id: '',
    name: '',
    description: '',
    date: '',
    time: '',
    locationLink: '',
    institute: '',
    organizingCommittee: '',
    tags: '',
    image: '',
    registrationLink: '',
    resources: '',
    speakers: [],
    isFree: true,
    ticketDescription: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:9091/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setEventData({
      ...event,
      speakers: event.speakers.join(', ')
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9091/events/${eventData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          speakers: eventData.speakers.split(',').map(s => s.trim())
        }),
      });
      if (response.ok) {
        window.alert("Event successfully updated");
        fetchEvents(); // Refresh the event list
      } else {
        window.alert("Failed to update event");
      }
    } catch (error) {
      console.error('Error updating event:', error);
      window.alert("Error updating event");
    }
  };

  return (
    <div>
    <h2 className="text-2xl font-bold text-black mb-6">Update Event</h2>
    
    <table className="w-full mb-6">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.id}>
            <td>{event.name}</td>
            <td>{event.description.substring(0, 50)}...</td>
            <td>
              <button 
                onClick={() => handleEventSelect(event)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Select
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {selectedEvent && (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-black mb-6">Update Event</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          <Calendar className="inline mr-2" size={16} /> Event Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
          placeholder="Event Name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          <FileText className="inline mr-2" size={16} /> Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          placeholder="Event Description"
          rows="3"
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            <Calendar className="inline mr-2" size={16} /> Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
            <Clock className="inline mr-2" size={16} /> Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="locationLink">
          <MapPin className="inline mr-2" size={16} /> Location Link
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="locationLink"
          type="url"
          name="locationLink"
          value={eventData.locationLink}
          onChange={handleInputChange}
          placeholder="https://..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institute">
          <Users className="inline mr-2" size={16} /> Institute
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="institute"
          type="text"
          name="institute"
          value={eventData.institute}
          onChange={handleInputChange}
          placeholder="Organizing Institute"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizingCommittee">
          <Users className="inline mr-2" size={16} /> Organizing Committee
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="organizingCommittee"
          type="text"
          name="organizingCommittee"
          value={eventData.organizingCommittee}
          onChange={handleInputChange}
          placeholder="Organizing Committee"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
          <Tag className="inline mr-2" size={16} /> Tags
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tags"
          type="text"
          name="tags"
          value={eventData.tags}
          onChange={handleInputChange}
          placeholder="Comma-separated tags"
        />
      </div>
      <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              <Image className="inline mr-2" size={16} /> Event Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="url"
              name="image"
              value={eventData.image}
              onChange={handleInputChange}
              placeholder="https://..."
            />
          </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationLink">
          <Link className="inline mr-2" size={16} /> Registration Link
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="registrationLink"
          type="url"
          name="registrationLink"
          value={eventData.registrationLink}
          onChange={handleInputChange}
          placeholder="https://..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resources">
          <FileText className="inline mr-2" size={16} /> Resources (Optional)
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="resources"
          name="resources"
          value={eventData.resources}
          onChange={handleInputChange}
          placeholder="Additional resources"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          <Mic className="inline mr-2" size={16} /> Speakers (Optional)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="speakers"
          value={eventData.speakers.join(', ')}
          onChange={(e) => setEventData(prev => ({ ...prev, speakers: e.target.value.split(',').map(s => s.trim()) }))}
          placeholder="Speaker names (comma-separated)"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={eventData.isFree}
            onChange={() => setEventData(prev => ({ ...prev, isFree: !prev.isFree }))}
          />
          <span className="ml-2 text-gray-700"><DollarSign className="inline mr-2" size={16} /> Free Event</span>
        </label>
      </div>

      {!eventData.isFree && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketDescription">
            Ticket Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ticketDescription"
            name="ticketDescription"
            value={eventData.ticketDescription}
            onChange={handleInputChange}
            placeholder="Ticket details and pricing"
            rows="3"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Event
        </button>
      </div>
    </form>
    )}
  </div>
  );
};

export default UpdateEventForm;