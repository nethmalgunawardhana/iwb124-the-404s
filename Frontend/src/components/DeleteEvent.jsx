import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const DeleteEventPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');

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

  const handleDelete = async () => {
    if (!selectedEventId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Please select an event to delete',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:9091/events/${selectedEventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: 'Event deleted successfully',
          icon: "success"
        });
        setSelectedEventId('');
        fetchEvents(); // Refresh the list
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:'Failed to delete event',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:'Error deleting event:', error,
      });
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Delete Event</h2>
      
      <div className="mb-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-2">Title</th>
              <th className="text-left pb-2">Date</th>
              <th className="text-right pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-gray-700">
                <td className="py-2">{event.name}</td>
                <td className="py-2">{event.date}</td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => setSelectedEventId(event.id)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="selectedEventId">
          Selected Event ID
        </label>
        <input
          className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="selectedEventId"
          type="text"
          value={selectedEventId}
          readOnly
        />
      </div>

      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
      >
        <Trash2 className="mr-2" size={16} />
        Delete Event
      </button>
    </div>
  );
};

export default DeleteEventPage;