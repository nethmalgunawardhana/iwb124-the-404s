import React, { useState } from 'react';
import CreateEventForm from "../components/CreateEventForm";
import UpdateEventForm from "../components/UpdateEventForm";
import DeleteEventPage from "../components/DeleteEvent";

export default function EventDashboard() {
  const [activeForm, setActiveForm] = useState('create');

  const handleCreateSubmit = (data) => {
    console.log('Create event data submitted:', data);
    // Here you would typically send the data to your backend
  };

  const handleUpdateSubmit = (data) => {
    console.log('Update event data submitted:', data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 fixed h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Event Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveForm('create')}
                className={`w-full text-left py-2 px-4 hover:bg-gray-700 rounded ${activeForm === 'create' ? 'bg-gray-700' : ''}`}
              >
                Create Event
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveForm('update')}
                className={`w-full text-left py-2 px-4 hover:bg-gray-700 rounded ${activeForm === 'update' ? 'bg-gray-700' : ''}`}
              >
                Update Event
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveForm('delete')}
                className={`w-full text-left py-2 px-4 hover:bg-gray-700 rounded ${activeForm === 'delete' ? 'bg-gray-700' : ''}`}
              >
                Delete Event
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 ml-64">
        {activeForm === 'create' && <CreateEventForm onSubmit={handleCreateSubmit} />}
        {activeForm === 'update' && <UpdateEventForm onSubmit={handleUpdateSubmit} initialData={null} />}
        {activeForm === 'delete' && <DeleteEventPage />}
      </div>
    </div>
  );
}