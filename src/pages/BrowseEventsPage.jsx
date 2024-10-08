import React, { useState } from 'react';

const BrowseEventsPage = () => {
  // Sample events data
  const allEvents = [
    { image: 'https://via.placeholder.com/300x200?text=Event+1', title: 'Music Fest', date: 'October 12, 2024', institute: 'Institute 1', price: 'free', tags: ['Music'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+2', title: 'Tech Expo', date: 'November 15, 2024', institute: 'Institute 2', price: 'paid', tags: ['Technology'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+3', title: 'Art Gala', date: 'December 20, 2024', institute: 'Institute 1', price: 'free', tags: ['Art'] },
    { image: 'https://via.placeholder.com/300x200?text=Event+4', title: 'Dance Show', date: 'January 10, 2025', institute: 'Institute 2', price: 'paid', tags: ['Dancing'] },
    // Add more events...
  ];

  const institutes = ['All Institutes', 'Institute 1', 'Institute 2', 'Institute 3'];
  const [selectedInstitute, setSelectedInstitute] = useState('All Institutes');
  const [price, setPrice] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(20); // Initially show 20 events

  const tags = [
    { name: 'Music', image: 'https://via.placeholder.com/100x100?text=Music' },
    { name: 'Technology', image: 'https://via.placeholder.com/100x100?text=Technology' },
    { name: 'Art', image: 'https://via.placeholder.com/100x100?text=Art' },
    { name: 'Dancing', image: 'https://via.placeholder.com/100x100?text=Dancing' },
  ];

  // Handle tag selection (only one tag can be selected at a time)
  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? [] : [tag])); // Only one tag at a time
  };

  // Filter events based on selected institutes, price, and tags
  const filteredEvents = allEvents.filter((event) => {
    const instituteMatch =
      selectedInstitute === 'All Institutes' || event.institute === selectedInstitute;
    const priceMatch = price === '' || event.price === price;
    const tagMatch = selectedTags.length === 0 || event.tags.includes(selectedTags[0]);

    return instituteMatch && priceMatch && tagMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <header className="bg-purple-600 text-white py-20" style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold">Browse Events</h1>
          <p className="mt-4 text-lg">Find events by institutes, pricing, or tags!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Filter Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6 text-purple-800">Filter Events</h2>

          {/* Dropdowns in One Line */}
          <div className="flex justify-between mb-4 space-x-4">
            {/* Institute Filter */}
            <div className="flex-grow">
              <label className="block font-semibold mb-2 text-gray-800">Select Institute</label>
              <select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white text-gray-800"
              >
                {institutes.map((institute) => (
                  <option key={institute} value={institute}>
                    {institute}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex-grow">
              <label className="block font-semibold mb-2 text-gray-800">Select Price</label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white text-gray-800"
              >
                <option value="">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Tag Filter */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-purple-800">Select Tags</h3>
            <div className="flex space-x-4">
              {tags.map((tag) => (
                <div
                  key={tag.name}
                  className={`cursor-pointer p-4 rounded-lg border hover:shadow-md transition-shadow ${selectedTags.includes(tag.name) ? 'border-purple-700' : 'border-gray-300'}`}
                  onClick={() => toggleTag(tag.name)}
                >
                  <img src={tag.image} alt={tag.name} className="w-24 h-24 object-cover rounded-md" />
                  <p className="mt-2 text-center text-gray-800">{tag.name}</p> {/* Changed color for visibility */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Display Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-6 text-purple-800">Available Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(0, visibleEvents).map((event, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-lg font-semibold mt-2 text-gray-800">{event.title}</h3> {/* Changed color for visibility */}
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-600">{event.institute}</p>
                <p className="text-gray-600">{event.price === 'free' ? 'Free' : 'Paid'}</p>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleEvents < filteredEvents.length && (
            <div className="text-center mt-8">
              <button
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors"
                onClick={() => setVisibleEvents(visibleEvents + 20)}
              >
                Load More Events
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 p-4 shadow">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">2023 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BrowseEventsPage;
