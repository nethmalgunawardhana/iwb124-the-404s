import React from 'react';

const EventDetailsCreatorContent = () => (
    <div className="event-details container flex-grow text-black">
    <header className="event-header">
      <h1 className="event-title">Amazing Music Festival</h1>
      <p className="event-meta">
        <span className="text-gray-500">August 10, 2024</span> | 
        <span className="text-gray-500">7:00 PM - 11:00 PM</span> | 
        <span className="text-green-500">Tickets Available</span>
      </p>
    </header>
  
    <div className="event-image-wrapper">
      <img src="/images/festival.jpg" alt="Event Image" className="event-image" />
    </div>
  
    <div className="event-description">
      <h2 className="heading">About the Event</h2>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod magna at magna aliquam tincidunt. Donec eu velit pulvinar, sagittis lacus vel, auctor ipsum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
      </p>
    </div>
  
    <div className="event-location">
      <h2 className="heading">Location</h2>
      <p className="text-gray-700">
        Central Park, New York City
      </p>
      <a href="#" className="btn btn-primary">View on Map</a>
    </div>
  
    <div className="event-speakers">
      <h2 className="heading">Speakers</h2>
      <ul className="speaker-list">
        <li className="speaker-item">
          <img src="/images/speaker1.jpg" alt="Speaker 1" className="speaker-avatar" />
          <div className="speaker-info">
            <h3 className="speaker-name">John Doe</h3>
            <p className="speaker-title">Musician</p>
          </div>
        </li>
        <li className="speaker-item">
          <img src="/images/speaker2.jpg" alt="Speaker 2" className="speaker-avatar" />
          <div className="speaker-info">
            <h3 className="speaker-name">Jane Smith</h3>
            <p className="speaker-title">DJ</p>
          </div>
        </li>
      </ul>
    </div>
  
    <div className="event-tickets">
      <h2 className="heading">Tickets</h2>
      <p className="text-gray-700">
        General Admission: $50 | VIP: $100
      </p>
      <a href="#" className="btn btn-primary">Get Tickets</a>
    </div>
  </div>
);

export default EventDetailsCreatorContent;