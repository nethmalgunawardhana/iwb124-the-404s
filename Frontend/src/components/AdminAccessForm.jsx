import React, { useState } from "react";
import { Users, FileText } from "lucide-react";

const AdminAccessForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    request: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, ...updateData } = eventData;

      const response = await fetch("http://localhost:9091/admin/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const createdRequest = await response.json();
        window.alert(
          `Request successfully created with ID: ${createdRequest.id}`
        );
        setFormData({
          name: "",
          phoneNumber: "",
          request: "",
          description: "",
        });
      } else {
        const errorData = await response.json();
        window.alert(`Failed to create request: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating request:", error);
      window.alert("Error creating request");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold text-black mb-6">
        Admin Access Request
      </h2>

      {/* Name Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          <Users className="inline mr-2" size={16} /> Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
        />
      </div>

      {/* Phone Number Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNumber"
        >
          <Users className="inline mr-2" size={16} /> Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Your Phone Number"
          required
        />
      </div>

      {/* Request Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="request"
        >
          <FileText className="inline mr-2" size={16} /> Request
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="request"
          type="text"
          name="request"
          value={formData.request}
          onChange={handleInputChange}
          placeholder="Request"
          required
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          <FileText className="inline mr-2" size={16} /> Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus :outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your request"
          rows="3"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit Request
        </button>
        <button
          type="button"
          onClick={onCancel} // Call the cancel function
          className="text-gray-600 hover:bg-red-500 font-bold hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminAccessForm;
