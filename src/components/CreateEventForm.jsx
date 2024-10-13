import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, Image, Link, FileText, Mic, DollarSign } from 'lucide-react';

const CreateEventForm = () => {
  const [eventData, setEventData] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleImageUpload = (e) => {
    setEventData(prevData => ({
      ...prevData,
      image: e.target.files[0]
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9091/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          speakers: eventData.speakers.filter(speaker => speaker.trim() !== '')
        }),
      });
      if (response.ok) {
        window.alert("Event successfully created");
        setEventData({
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
      } else {
        window.alert("Failed to create event");
      }
    } catch (error) {
      console.error('Error creating event:', error);
      window.alert("Error creating event");
    }

  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-black mb-6">Create a New Event</h2>
      
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
          required
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
          required
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
            required
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
            required
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
          required
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
          required
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
          required
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
          required
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
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resources">
          <FileText className="inline mr-2" size={16} /> Resources
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
          <Mic className="inline mr-2" size={16} /> Speakers
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="speakers"
          value={eventData.speakers.join(', ')}
          onChange={(e) => setEventData(prev => ({ ...prev, speakers: e.target.value.split(',').map(s => s.trim()) }))}
          placeholder="Speaker names (comma-separated)"
          required
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;