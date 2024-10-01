import React from 'react';
import { MessageSquare } from 'lucide-react';

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 bg-white border-b">
    <div className="flex space-x-4">
      <a href="#" className="text-gray-700">Home</a>
      <a href="#" className="text-gray-700">About</a>
      <a href="#" className="text-gray-700">Pricing</a>
      <a href="#" className="text-gray-700">Blog</a>
      <a href="#" className="text-gray-700">Contact us</a>
    </div>
    <div className="flex items-center space-x-4">
      <button className="text-gray-700"><MessageSquare size={20} /></button>
      <div className="flex items-center space-x-2">
        <img src="/api/placeholder/32/32" alt="User avatar" className="w-8 h-8 rounded-full" />
        <span className="text-gray-700">Admirra John</span>
      </div>
    </div>
  </nav>
);

export default Navbar;