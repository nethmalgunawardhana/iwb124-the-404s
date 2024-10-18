import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, Image, Link, FileText, WalletCards } from 'lucide-react';
import Swal from 'sweetalert2';

const CreateEventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    locationLink: '',
    payment: '',
    institute: '',
    organizingCommittee: '',
    tags: '',
    image: '',
    registrationLink: '',
    resources: '',
  });

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
      const formattedEventData = {
        ...eventData,

      };

      const response = await fetch('http://localhost:9091/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedEventData),
      });

      if (response.ok) {
        const createdEvent = await response.json();

        Swal.fire({
          title: "Success!",
          text: `Event successfully created with ID: ${createdEvent.id}`,
          icon: "success"
        });
        setEventData({
          name: '',
          description: '',
          date: '',
          time: '',
          locationLink: '',
          payment: '',
          institute: '',
          organizingCommittee: '',
          tags: '',
          image: '',
          registrationLink: '',
          resources: '',
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Success!",
          text: `Event successfully created with ID:${createdEvent.id}`,
          icon: "success"
        });
      }
    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-black mb-6">Create a New Event</h2>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          <Calendar className="inline mr-2" size={16} /> Event Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3  bg-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
          placeholder="Event Name"
          required
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          <FileText className="inline mr-2" size={16} /> Description
        </label>
        <textarea
          className="shadow appearance-none border rounded  bg-gray-300  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  focus:ring focus:ring-purple-300 "
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          placeholder="Event Description"
          rows="3"
          required
        />
      </div>

      {/* Date and Time Inputs */}
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            <Calendar className="inline mr-2" size={16} /> Date
          </label>
          <input
            className="shadow appearance-none  border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <Clock className="inline mr-2 " size={16} /> Time
          </label>
          <input
            className="shadow appearance-none border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      {/* Paid or not */}
      <div className="mb-4">
        <div className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payment">
          <WalletCards className="inline mr-2" size={16} /> Payment Type:
        </div>
        <div className="flex justify-between items-center p-5">
          <label className="inline-flex items-center text-black">
            <input
              id="default-radio-1"
              type="radio"
              name="payment"
              value="free"
              checked={eventData.payment === 'free'}
              onChange={handleInputChange}
              className="hidden peer" // Hide the default radio button
            />
            <span className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center mr-2 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition duration-200 ease-in-out">
              {eventData.payment === 'free' && (
                <span className="w-3 h-3 bg-white rounded-full"></span>
              )}
            </span>
            Free
          </label>
          <div className="flex-grow flex justify-center">
            <label className="inline-flex items-center text-black">
              <input
                id="default-radio-2"
                type="radio"
                name="payment"
                value="paid"
                checked={eventData.payment === 'paid'}
                onChange={handleInputChange}
                className="hidden peer" // Hide the default radio button
              />
              <span className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center mr-2 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition duration-200 ease-in-out">
                {eventData.payment === 'paid' && (
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                )}
              </span>
              Paid
            </label>
          </div>
        </div>

      </div>

      {/* Location Link Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="locationLink">
          <MapPin className="inline mr-2" size={16} /> Location Link
        </label>
        <input
          className="shadow appearance-none border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="locationLink"
          type="url"
          name="locationLink"
          value={eventData.locationLink}
          onChange={handleInputChange}
          placeholder="https://..."
          required
        />
      </div>

      {/* Institute Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institute">
          <Users className="inline mr-2" size={16} /> Institute
        </label>
        <input
          className="shadow appearance-none border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="institute"
          type="text"
          name="institute"
          value={eventData.institute}
          onChange={handleInputChange}
          placeholder="Organizing Institute"
          required
        />
      </div>

      {/* Organizing Committee Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizingCommittee">
          <Users className="inline mr-2" size={16} /> Organizing Committee
        </label>
        <input
          className="shadow appearance-none border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="organizingCommittee"
          type="text"
          name="organizingCommittee"
          value={eventData.organizingCommittee}
          onChange={handleInputChange}
          placeholder="Organizing Committee"
          required
        />
      </div>

      {/* Tags Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
          <Tag className="inline mr-2" size={16} /> Tags
        </label>
        <input
          className="shadow appearance-none border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tags"
          type="text"
          name="tags"
          value={eventData.tags}
          onChange={handleInputChange}
          placeholder="Comma-separated tags"
          required
        />
      </div>

      {/* Image URL Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          <Image className="inline mr-2" size={16} /> Event Image URL
        </label>
        <input
          className="shadow appearance-none border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="url"
          name="image"
          value={eventData.image}
          onChange={handleInputChange}
          placeholder="https://..."
        />
      </div>

      {/* Registration Link Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationLink">
          <Link className="inline mr-2" size={16} /> Registration Link
        </label>
        <input
          className="shadow appearance-none border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="registrationLink"
          type="url"
          name="registrationLink"
          value={eventData.registrationLink}
          onChange={handleInputChange}
          placeholder="https://..."
          required
        />
      </div>

      {/* Resources Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resources">
          <FileText className="inline mr-2" size={16} /> Resources
        </label>
        <textarea
          className="shadow appearance-none border rounded  bg-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:ring-purple-300"
          id="resources"
          name="resources"
          value={eventData.resources}
          onChange={handleInputChange}
          placeholder="Additional resources"
          rows="3"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          className="bg-purple-900 hover:bg-purple-300 hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;