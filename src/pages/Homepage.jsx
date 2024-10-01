// Import necessary dependencies
import React from 'react';
import { User, Settings, Info, HelpCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Hero Section */}
      <header className="bg-purple-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background video */}
          <div className="video-wrapper absolute inset-0 z-0">
            <video autoPlay loop muted className="w-full h-full object-cover">
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Discover Amazing Events</h1>
          <p className="mt-4 text-lg">Your one-stop solution for all your event needs!</p>
          <button
            className="mt-6 px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-200 transition-colors animate-pulse"
          >
            Explore Events
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Features Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <User size={40} />, title: "My Profile", description: "Manage your profile and settings." },
              { icon: <Settings size={40} />, title: "Settings", description: "Customize your experience and preferences." },
              { icon: <Info size={40} />, title: "About Us", description: "Learn more about our mission and values." },
              { icon: <HelpCircle size={40} />, title: "Help Center", description: "Get support and find answers to your questions." }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 animate-fadeIn"
              >
                {feature.icon}
                <h3 className="text-lg font-semibold mt-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
          <p className="text-gray-600 mb-6">Don't miss out on our latest events!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: 'https://via.placeholder.com/300x200?text=Event+1',
                title: 'Event 1',
                date: 'October 12, 2024',
              },
              {
                image: 'https://via.placeholder.com/300x200?text=Event+2',
                title: 'Event 2',
                date: 'November 15, 2024',
              },
              {
                image: 'https://via.placeholder.com/300x200?text=Event+3',
                title: 'Event 3',
                date: 'December 20, 2024',
              },
            ].map((event, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 animate-fadeIn"
              >
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
              </div>
            ))}
          </div>
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors animate-pulse"
          >
            View All Events
          </button>
        </section>

        {/* Get Started Section */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600 mb-6">Join us today to take advantage of our services!</p>
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors animate-pulse"
          >
            Sign Up Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 p-4 shadow">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">2024 Your Company. All rights reserved.</p>
          <ul className="flex justify-center mt-4">
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact Us
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
