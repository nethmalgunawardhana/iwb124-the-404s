import React from 'react';
import { User, Calendar, Cog, MessageSquare, LogOut } from 'lucide-react';

const Sidebar = () => (
  <aside className="w-64 bg-white p-4 border-r h-screen">
    <h2 className="text-xl font-semibold mb-4">Settings</h2>
    <ul className="space-y-2">
      <li><a href="#" className="flex items-center text-gray-700"><User size={20} className="mr-2" /> My Profile</a></li>
      <li><a href="#" className="flex items-center text-gray-700"><Calendar size={20} className="mr-2" /> Bookings</a></li>
      <li><a href="#" className="flex items-center text-blue-500"><Cog size={20} className="mr-2" /> Settings</a></li>
      <li><a href="#" className="flex items-center text-gray-700"><MessageSquare size={20} className="mr-2" /> Contact us</a></li>
    </ul>
    <div className="mt-auto">
      <button className="flex items-center text-gray-700 mt-8"><LogOut size={20} className="mr-2" /> Logout</button>
    </div>
  </aside>
);

export default Sidebar;