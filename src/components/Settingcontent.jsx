import React from 'react';
import { Camera } from 'lucide-react';

const SettingsContent = () => (
  <div className="w-full max-w-4xl mx-auto">
    <h1 className="text-2xl font-semibold mb-6">General Settings</h1>
    <p className="mb-6">Your current Primary email address is <span className="text-blue-500">dashprops@example.com</span></p>

    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Avatar</h2>
      <div className="flex items-center space-x-4">
        <img src="../user.png" alt="User avatar" className="w-16 h-16 rounded-full" />
        <div>
          <button className="text-blue-500 hover:underline">Change</button>
          <button className="text-blue-500 hover:underline ml-4">Remove</button>
        </div>
      </div>
    </div>

    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Cover photo</h2>
      <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg">
        <Camera className="mx-auto mb-2" size={24} />
        <p>Drag image here, or <span className="text-blue-500 hover:underline cursor-pointer">Browse Files</span></p>
      </div>
      <button className="text-blue-500 hover:underline mt-2">Change</button>
    </div>

    <div>
      <h2 className="text-lg font-semibold mb-4">Basic information</h2>
      <p className="text-sm text-gray-600 mb-4">Update some personal information. Your address will never be publicly available.</p>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="First name" className="w-full bg-white p-2 border rounded" />
          <input type="text" placeholder="Last Name" className="w-full bg-white p-2 border rounded" />
        </div>
        <input type="text" placeholder="Username" className="w-full p-2 bg-white border rounded" />
        <input type="email" placeholder="Email" className="w-full bg-white p-2 border rounded" />
        <input type="tel" placeholder="Phone" className="w-full bg-white p-2 border rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="City" className="w-full bg-white p-2 border rounded" />
          <input type="text" placeholder="Province" className="w-full bg-white p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  </div>
);

export default SettingsContent;