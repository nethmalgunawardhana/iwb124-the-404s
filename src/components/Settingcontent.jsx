import React from 'react';
import { Camera } from 'lucide-react';

const SettingsContent = () => (
  <div className="p-8 bg-gray-100 flex-grow text-black">
    <h1 className="text-2xl font-semibold mb-6">General Settings</h1>
    <p className="mb-6">Your current Primary email address is <span className="text-blue-500">dashprops@example.com</span></p>

    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Avatar</h2>
      <div className="flex items-center space-x-4">
        <img src="/api/placeholder/64/64" alt="User avatar" className="w-16 h-16 rounded-full" />
        <div>
          <button className="text-blue-500">Change</button>
          <button className="text-blue-500 ml-4">Remove</button>
        </div>
      </div>
    </div>

    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Cover photo</h2>
      <div className="border-2 border-dashed border-gray-300 p-8 text-center">
        <Camera className="mx-auto mb-2" size={24} />
        <p>Drag image here, or <span className="text-blue-500">Browse Files</span></p>
      </div>
      <button className="text-blue-500 mt-2">Change</button>
    </div>

    <div>
      <h2 className="text-lg font-semibold mb-4">Basic information</h2>
      <p className="text-sm text-gray-600 mb-4">Update some personal information. Your address will never be publicly available.</p>
      <form className="space-y-4">
        <div className="flex space-x-4">
          <input type="text" placeholder="First name" className="w-1/2 p-2 border rounded" />
          <input type="text" placeholder="Last Name" className="w-1/2 p-2 border rounded" />
        </div>
        <input type="text" placeholder="user name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="tel" placeholder="Phone" className="w-full p-2 border rounded" />
        <input type="text" placeholder="City" className="w-full p-2 border rounded" />
        <input type="text" placeholder="province" className="w-full p-2 border rounded" />
      </form>
    </div>
  </div>
);

export default SettingsContent;