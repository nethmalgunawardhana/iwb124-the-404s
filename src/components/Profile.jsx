import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      <div className="flex items-center space-x-6 mb-6">
        <img
          className="h-32 w-32 rounded-full object-cover"
          src="https://via.placeholder.com/150"
          alt="User Profile"
        />
        <div>
          <h3 className="text-xl font-bold">John Doe</h3>
          <p className="text-gray-600">johndoe@example.com</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue="johndoe@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="+1234567890"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="A short bio about yourself"
          ></textarea>
        </div>
      </div>
      <button className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
