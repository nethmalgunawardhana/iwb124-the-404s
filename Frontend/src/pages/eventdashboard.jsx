import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateEventForm from "../components/CreateEventForm";
import UpdateEventForm from "../components/UpdateEventForm";
import DeleteEventPage from "../components/DeleteEvent";
import { Home } from "lucide-react";

export default function EventDashboard() {
  const [activeForm, setActiveForm] = useState("create");
  const navigate = useNavigate();

  const handleCreateSubmit = (data) => {
    console.log("Create event data submitted:", data);
    // Here you would typically send the data to your backend
  };

  const handleUpdateSubmit = (data) => {
    console.log("Update event data submitted:", data);
    // Here you would typically send the data to your backend
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-purple-900 text-white p-6 fixed h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Event Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={navigateToHome}
                className="w-full text-left py-2 px-4 hover:bg-white hover:text-black rounded flex items-center"
              >
                <Home className="mr-2" size={18} />
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveForm("create")}
                className={`w-full text-left py-2 px-4 hover:bg-white hover:text-black rounded ${
                  activeForm === "create" ? "bg-white text-black" : ""
                }`}
              >
                Create Event
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveForm("update")}
                className={`w-full text-left py-2 px-4  hover:bg-white hover:text-black rounded ${
                  activeForm === "update" ? "bg-white text-black" : ""
                }`}
              >
                Update Event
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveForm("delete")}
                className={`w-full text-left py-2 px-4  hover:bg-white hover:text-black rounded ${
                  activeForm === "delete" ? "bg-white text-black" : ""
                }`}
              >
                Delete Event
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 ml-64">
        {activeForm === "create" && (
          <CreateEventForm onSubmit={handleCreateSubmit} />
        )}
        {activeForm === "update" && (
          <UpdateEventForm onSubmit={handleUpdateSubmit} initialData={null} />
        )}
        {activeForm === "delete" && <DeleteEventPage />}
      </div>
    </div>
  );
}
