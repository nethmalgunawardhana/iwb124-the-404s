import React, { useState } from "react";

const OrganizationVerification = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [organizationPhone, setOrganizationPhone] = useState("");
  const [organizationAddress, setOrganizationAddress] = useState("");
  const [organizationWebsite, setOrganizationWebsite] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [validationDocuments, setValidationDocuments] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API or perform logic to verify organization
  };

  const handleFileChange = (e) => {
    setValidationDocuments(e.target.files[0]);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 relative">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded absolute top-4 left-4"
        style={{ zIndex: 1 }}
      >
        Back
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4"
        style={{ zIndex: 1 }}
      >
        Close
      </button>
      <div className="max-w-3xl mx-auto p-6 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
          Organization Verification
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="organizationName"
            >
              Organization Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="organizationName"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="organizationEmail"
            >
              Organization Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="organizationEmail"
              type="email"
              value={organizationEmail}
              onChange={(e) => setOrganizationEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="organizationPhone"
            >
              Organization Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="organizationPhone"
              type="tel"
              value={organizationPhone}
              onChange={(e) => setOrganizationPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="organizationAddress"
            >
              Organization Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="organizationAddress"
              type="text"
              value={organizationAddress}
              onChange={(e) => setOrganizationAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="organizationWebsite"
            >
              Organization Website
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="organizationWebsite"
              type="url"
              value={organizationWebsite}
              onChange={(e) => setOrganizationWebsite(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="organizationType"
            >
              Organization Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray- 700 leading-t ight focus:outline-none focus:shadow-outline"
              id="organizationType"
              value={organizationType}
              onChange={(e) => setOrganizationType(e.target.value)}
              required
            >
              <option value="">Select Organization Type</option>
              <option value="Non-Profit">Non-Profit</option>
              <option value="For-Profit">For-Profit</option>
              <option value="Government">Government</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="organizationDescription"
            >
              Organization Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="organizationDescription"
              value={organizationDescription}
              onChange={(e) => setOrganizationDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="validationDocuments"
            >
              Upload Validation Documents
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="validationDocuments"
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Verify Organization
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizationVerification;
