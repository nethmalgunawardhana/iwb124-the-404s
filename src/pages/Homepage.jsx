import React from 'react';
import { User, Settings, Info, HelpCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-purple-600">Welcome to Our Website</h1>
          <p className="mt-2 text-gray-600">Your one-stop solution for all your needs!</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <User size={40} className="text-purple-600 mb-2" />
              <h3 className="text-lg font-semibold">My Profile</h3>
              <p className="text-gray-600">Manage your profile and settings.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <Settings size={40} className="text-purple-600 mb-2" />
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-gray-600">Customize your experience and preferences.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <Info size={40} className="text-purple-600 mb-2" />
              <h3 className="text-lg font-semibold">About Us</h3>
              <p className="text-gray-600">Learn more about our mission and values.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <HelpCircle size={40} className="text-purple-600 mb-2" />
              <h3 className="text-lg font-semibold">Help Center</h3>
              <p className="text-gray-600">Get support and find answers to your questions.</p>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600 mb-6">Join us today to take advantage of our services!</p>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors">
            Sign Up Now
          </button>
        </section>
      </main>

      <footer className="bg-white mt-8 p-4 shadow">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">© 2023 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
