import React, { useState } from "react";
import EventEdit from "./EventEdit";

const EventCreatorContent = () => {
  const [eventinfo, setEventInfo] = useState({
    EventName: "",
    Date: "",
    Time: "",
    Location: "",
    Public: true,
    paid: true,
    ticketLink: "",
    Image: "",
    Speakers: "",
    verified: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newPicture, setNewPicture] = useState(null);
  const [changesMade, setChangesMade] = useState(false);

  const [errors, setErrors] = useState({
    Date: "",
    Time: "",
  });

  const handleEditClick = () => {
    setShowPopup(true);
  };

  const handleSaveChanges = () => {
    setShowPopup(false);
  };

  const handleImageChange = (e) => {
    setNewPicture(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventinfo, [name]: value });
  };

  return (
    <div className="event-details container flex-grow text-black">
      <div className="event-image-wrapper relative">
        <img
          src="./src/assets/fall.jpg"
          alt="Event Image"
          className="object-cover w-full h-60 rounded-lg"
        />
      </div>
      <header className="event-header">
        <div className="fixed bottom-10 right-10">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>

        <h1 className="event-title text-4xl md:text-4xl font-semibold p-2.5">
          Amazing Music Festival
        </h1>

        <p className="event-meta text-2xl p-2.5">
          <span className="text-gray-500">August 10, 2024</span> |
          <span className="text-gray-500">7:00 PM - 11:00 PM</span>
        </p>
      </header>
      <br></br>

      <div className="event-description p-2.5">
        <h2 className="heading text-2xl">About the Event</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          euismod magna at magna aliquam tincidunt. Donec eu velit pulvinar,
          sagittis lacus vel, auctor ipsum. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
        </p>
      </div>

      <div className="event-location p-2.5">
        <h2 className="heading text-2xl">Location</h2>
        <p className="text-gray-700">Central Park, New York City</p>
        <a href="#" className="btn btn-primary">
          View on Map
        </a>
      </div>

      <div className="event-speakers p-2.5">
        <h2 className="heading text-2xl">Speakers</h2>
        <ul className="speaker-list flex gap-4 py-3">
          <li className="speaker-item">
            <img
              src="./src/assets/fall.jpg"
              alt="Speaker 1"
              className="speaker-avatar h-48 w-40 object-cover rounded-lg"
            />
            <div className="speaker-info">
              <h3 className="speaker-name text-xl font-semibold">John Doe</h3>
              <p className="speaker-title text-gray-500">Musician</p>
            </div>
          </li>
          <li className="speaker-item">
            <img
              src="./src/assets/fall.jpg"
              alt="Speaker 2"
              className="speaker-avatar h-48 w-40 object-cover rounded-lg"
            />
            <div className="speaker-info">
              <h3 className="speaker-name text-xl font-semibold">Jane Smith</h3>
              <p className="speaker-title text-gray-500">DJ</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="event-tickets p-2.5">
        <h2 className="heading text-2xl">Tickets</h2>
        <p className="text-gray-700">General Admission: $50 | VIP: $100</p>
        <a href="#" className="btn btn-primary">
          Get Tickets
        </a>
      </div>
      <br></br>
      <div className="Tags p-2.5">
        <h2 className="heading text-2xl">Tags</h2>
        <div className="flex flex-wrap gap-2 p-2.5">
          <div className="bg-purple-400 text-white px-4 py-2 rounded-md">
            Online Events
          </div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-md">
            Things To Do Online
          </div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-md">
            Online Classes
          </div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-md">
            Online Spirituality Classes
          </div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-md">
            #spirituality
          </div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-md">
            #tarot
          </div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-md">
            #psychics
          </div>
          <div className="bg-purple-400 text-white px-4 py-2 rounded-md">
            #tarotcards
          </div>
        </div>
      </div>

      {showPopup && (
        <EventEdit
          currentEventTitle={eventinfo.EventName}
          currentEventDescription={eventinfo.Speakers}
          currentEventDate={eventinfo.Date}
          currentEventTime={eventinfo.Time}
          currentEventLocation={eventinfo.Location}
          currentEventImage={eventinfo.Image}
          handleSaveChanges={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default EventCreatorContent;
