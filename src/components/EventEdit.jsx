import React, { useState } from "react";

const EventEdit = ({
  currentEventTitle,
  currentEventDescription,
  currentEventDate,
  currentEventTime,
  currentEventLocation,
  currentEventImage,
  handleSaveChanges,
}) => {
  const [eventTitle, setEventTitle] = useState(currentEventTitle);
  const [eventDescription, setEventDescription] = useState(
    currentEventDescription
  );
  const [eventDate, setEventDate] = useState(currentEventDate);
  const [eventTime, setEventTime] = useState(currentEventTime);
  const [eventLocation, setEventLocation] = useState(currentEventLocation);
  const [eventImage, setEventImage] = useState(currentEventImage);

  const handleImageChange = (e) => {
    setEventImage(e.target.files[0]);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <div className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Edit Event Details</h2>
        <form>
          <label className="block mb-2" htmlFor="event-title">
            Event Title
          </label>
          <input
            type="text"
            id="event-title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-900 bg-purple-100"
            placeholder="Enter event title"
          />
          <label className="block mb-2" htmlFor="event-description">
            Event Description
          </label>
          <textarea
            id="event-description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-900 bg-purple-100"
            placeholder="Enter event description"
          />
          <label className="block mb-2" htmlFor="event-date">
            Event Date
          </label>
          <input
            type="date"
            id="event-date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-900 bg-purple-100"
          />
          <label className="block mb-2" htmlFor="event-time">
            Event Time
          </label>
          <input
            type="time"
            id="event-time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-900 bg-purple-100"
          />
          <label className="block mb-2" htmlFor="event-location">
            Event Location
          </label>
          <input
            type="text"
            id="event-location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-900 bg-purple-100"
            placeholder="Enter event location"
          />
          <label className="block mb-2" htmlFor="event-image">
            Event Image
          </label>
          <input
            type="file"
            id="event-image"
            onChange={handleImageChange}
            className="w-full p-2 pl-10 text-sm text-gray-900 bg-purple-100"
          />
          {eventImage && (
            <img
              src={URL.createObjectURL(eventImage)}
              alt="Event Image"
              className="w-full h-48 object-cover mb-4"
            />
          )}
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventEdit;
