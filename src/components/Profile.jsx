import React, { useState } from 'react';

// Regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International phone number format

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
    verified: false, // Change this to false to test unverified state
    profilePicture: "../user.png", // Default profile picture
  });
  
  // State to manage edit mode and picture change
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newPicture, setNewPicture] = useState(null);
  const [changesMade, setChangesMade] = useState(false);

  // State to manage form validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  // Function to validate the form
  const validateForm = () => {
    let valid = true;
    let newErrors = { fullName: '', email: '', phoneNumber: '' };

    if (!userInfo.fullName) {
      newErrors.fullName = "Full name cannot be empty.";
      valid = false;
    }

    if (!userInfo.email) {
      newErrors.email = "Email cannot be empty.";
      valid = false;
    } else if (!emailRegex.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!userInfo.phoneNumber) {
      newErrors.phoneNumber = "Phone number cannot be empty.";
      valid = false;
    } else if (!phoneRegex.test(userInfo.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Handle edit mode toggle
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle form submission and validation
  const handleSubmit = () => {
    if (validateForm()) {
      alert('Changes saved successfully!');
      setIsEditing(false); // Exit edit mode
    }
  };

  // Handle profile picture change
  const handlePictureClick = () => {
    if (isEditing) {
      setShowPopup(true);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setNewPicture(loadEvent.target.result);
        setChangesMade(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemovePicture = () => {
    setNewPicture(null);
    setChangesMade(true);
  };

  const handleSavePicture = () => {
    if (newPicture) {
      setUserInfo({
        ...userInfo,
        profilePicture: newPicture,
      });
    } else {
      setUserInfo({
        ...userInfo,
        profilePicture: "../user.png", // Reset to default
      });
    }
    setShowPopup(false);
    setChangesMade(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">User Profile</h2>
        <div className="flex items-center space-x-6 mb-6">
          <div className={`relative`}>
            <img
              className={`h-32 w-32 rounded-full object-cover border-4 ${userInfo.verified ? 'border-yellow-500' : 'border-purple-500'}`}
              src={newPicture || userInfo.profilePicture}
              alt="User Profile"
              onClick={handlePictureClick}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              {userInfo.fullName}
              {userInfo.verified && (
                <img
                  className="ml-2 h-6 w-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                  alt="Verified Icon"
                />
              )}
            </h3>
            <p className="text-gray-600">{userInfo.email}</p>
            <button 
              onClick={handleEdit}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white text-purple-600 ${
                isEditing ? 'cursor-text' : 'cursor-not-allowed'
              }`}
              value={userInfo.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white text-purple-600 ${
                isEditing ? 'cursor-text' : 'cursor-not-allowed'
              }`}
              value={userInfo.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white text-purple-600 ${
                isEditing ? 'cursor-text' : 'cursor-not-allowed'
              }`}
              value={userInfo.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Save Changes Button */}
        {isEditing && (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800"
            disabled={Object.values(errors).some(error => error)} // Disable if any error exists
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Popup for changing profile picture */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-bold mb-4">Change Profile Picture</h3>
            <button onClick={handleRemovePicture} className="text-red-500 hover:underline">Remove Picture</button>
            <div className="my-4">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {changesMade && (
              <button onClick={handleSavePicture} className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800">
                Save Changes
              </button>
            )}
            <button onClick={() => setShowPopup(false)} className="mt-2 text-gray-600 hover:underline">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
