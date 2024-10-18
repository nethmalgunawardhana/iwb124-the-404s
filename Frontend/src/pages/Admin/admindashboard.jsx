import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [personalVerificationRequests, setPersonalVerificationRequests] =
    useState([]);
  const [
    organizationVerificationRequests,
    setOrganizationVerificationRequests,
  ] = useState([]);

  useEffect(() => {
    // Call API to fetch personal verification requests
    fetch("/api/personal-verification-requests")
      .then((response) => response.json())
      .then((data) => setPersonalVerificationRequests(data));

    // Call API to fetch organization verification requests
    fetch("/api/organization-verification-requests")
      .then((response) => response.json())
      .then((data) => setOrganizationVerificationRequests(data));
  }, []);

  const handleVerifyPersonalAccount = (id) => {
    // Call API to verify personal account
    fetch(`/api/verify-personal-account/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update personal verification requests state
        setPersonalVerificationRequests(
          personalVerificationRequests.filter((request) => request.id !== id)
        );
      });
  };

  const handleVerifyOrganization = (id) => {
    // Call API to verify organization
    fetch(`/api/verify-organization/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update organization verification requests state
        setOrganizationVerificationRequests(
          organizationVerificationRequests.filter(
            (request) => request.id !== id
          )
        );
      });
  };

  return (
    <div className="h-screen flex flex-row">
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Admin Dashboard
        </h2>
        <ul>
          <li className="mb-4">
            <a
              href="/"
              className="text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded"
            >
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/profile"
              className="text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded"
            >
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/settings"
              className="text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-black">
          Admin Dashboard
        </h2>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">
            Personal Verification Requests
          </h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {personalVerificationRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-2">{request.name}</td>
                  <td className="px-4 py-2">{request.email}</td>
                  <td className="px-4 py-2">{request.phone}</td>
                  <td className="px-4 py-2">{request.address}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleVerifyPersonalAccount(request.id)}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">
            Organization Verification Requests
          </h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizationVerificationRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-2">{request.name}</td>
                  <td className="px-4 py-2">{request.email}</td>
                  <td className="px-4 py-2">{request.phone}</td>
                  <td className="px-4 py-2">{request.address}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleVerifyOrganization(request.id)}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
