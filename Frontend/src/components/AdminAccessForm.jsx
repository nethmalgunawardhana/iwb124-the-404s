import React, { useState } from "react";
import { Users, FileText } from "lucide-react";
import Swal from 'sweetalert2';

const AdminAccessForm = ({ onCancel, onClose }) => {
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

  const resetForm = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      request: "",
      description: "",
    });
  };

  const showSuccessAlert = (id) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: `Request successfully created with ID: ${id}`,
      confirmButtonColor: '#3B82F6',
    }).then(() => {
      onClose(); // Close the popup window after the success message
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message || 'Error creating request. Please try again.',
      confirmButtonColor: '#EF4444',
    });
  };

  const showCancelConfirmation = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will lose all entered data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#3B82F6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep editing'
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm();
        onCancel?.();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Show loading state
      Swal.fire({
        title: 'Submitting...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch("http://localhost:9091/admin/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Close loading state
      Swal.close();

      if (response.ok) {
        showSuccessAlert(data.id);
        resetForm();
      } else {
        showErrorAlert(data.message);
      }
    } catch (error) {
      console.error("Error creating request:", error);
      showErrorAlert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
          <Users className="mr-2" size={24} />
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 transition-colors"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 transition-colors"
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Your Phone Number"
            required
            pattern="[0-9]+"
          />
        </div>

        {/* Request Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="request"
          >
            <FileText className="inline mr-2" size={16} /> Request Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 transition-colors"
            id="request"
            type="text"
            name="request"
            value={formData.request}
            onChange={handleInputChange}
            placeholder="Type of Access Request"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            <FileText className="inline mr-2" size={16} /> Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 transition-colors"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Please describe your request in detail..."
            rows="4"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex-1 transition-all transform hover:scale-105"
            type="submit"
          >
            Submit Request
          </button>
          <button
            type="button"
            onClick={showCancelConfirmation}
            className="bg-gray-100 hover:bg-red-500 text-gray-700 hover:text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex-1 transition-all transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAccessForm;