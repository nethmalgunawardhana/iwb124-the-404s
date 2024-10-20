import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { auth } from "../firebase/firebase";
import { updateProfile } from "firebase/auth";
import AdminAccessForm from "./AdminAccessForm";

import AOS from "aos";
import "aos/dist/aos.css";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const Profile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    verified: false,
    profilePicture: "../user.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [adminPopup, setAdminPopup] = useState(false);
  const [newPicture, setNewPicture] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleGetAdminAccess = () => {
    setAdminPopup(true);
  };

  const handleAdminFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setAdminPopup(false);
  };

  const handleAdminFormCancel = () => {
    setAdminPopup(false); // Close the admin access form
  };

  // Load user data when component mounts
  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        fullName: currentUser.displayName || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        verified: currentUser.emailVerified || false,
        profilePicture: currentUser.photoURL || "../user.png",
      });
    }
  }, [currentUser]);

  const validateForm = () => {
    let valid = true;
    let newErrors = { fullName: "", email: "", phoneNumber: "" };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Update profile in Firebase
        await updateProfile(auth.currentUser, {
          displayName: userInfo.fullName,
          photoURL: userInfo.profilePicture,
        });

        // Update context
        setCurrentUser({
          ...currentUser,
          displayName: userInfo.fullName,
          photoURL: userInfo.profilePicture,
        });

        // Save to localStorage for persistence
        const userData = JSON.parse(localStorage.getItem("authUser") || "{}");
        userData.displayName = userInfo.fullName;
        userData.photoURL = userInfo.profilePicture;
        localStorage.setItem("authUser", JSON.stringify(userData));

        setSuccessMessage("Changes saved successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        setErrorMessage("Failed to save changes. Please try again.");
      }
    }
  };

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

  const handleSavePicture = async () => {
    try {
      const newPhotoURL = newPicture || "../user.png";

      // Update profile in Firebase
      await updateProfile(auth.currentUser, {
        photoURL: newPhotoURL,
      });

      // Update local state
      setUserInfo({
        ...userInfo,
        profilePicture: newPhotoURL,
      });

      // Update context
      setCurrentUser({
        ...currentUser,
        photoURL: newPhotoURL,
      });

      // Update localStorage
      const userData = JSON.parse(localStorage.getItem("authUser") || "{}");
      userData.photoURL = newPhotoURL;
      localStorage.setItem("authUser", JSON.stringify(userData));

      setShowPopup(false);
      setChangesMade(false);
      setSuccessMessage("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setErrorMessage("Failed to update profile picture. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2
              className="text-3xl font-bold mb-8 text-center text-purple-700"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              User Profile
            </h2>
            <button
              onClick={handleGetAdminAccess}
              className="absolute top-4 right-4 px-4 py-2 text-sm md:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <span className="hidden md:inline">Event Creator Access</span>
              <span className="md:hidden">Creator Access</span>
            </button>
            <div
              className="flex flex-col items-center mb-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="relative group mb-4">
                <img
                  className={`h-40 w-40 rounded-full object-cover border-4 ${
                    userInfo.verified
                      ? "border-yellow-400"
                      : "border-purple-500"
                  } cursor-pointer transition-all duration-300 group-hover:opacity-75`}
                  src={newPicture || userInfo.profilePicture}
                  alt="User Profile"
                  onClick={handlePictureClick}
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                      Change Picture
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                  {userInfo.fullName}
                  {userInfo.verified && (
                    <img
                      className="ml-2 h-6 w-6"
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                      alt="Verified Icon"
                    />
                  )}
                </h3>
                <p className="text-gray-600 mt-1">{userInfo.email}</p>
                <button
                  onClick={handleEdit}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white text-purple-700 ${
                    isEditing ? "cursor-text" : "cursor-not-allowed"
                  }`}
                  value={userInfo.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white text-purple-700 cursor-not-allowed"
                  value={userInfo.email}
                  disabled={true}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Save Changes Button */}
            {isEditing && (
              <button
                onClick={handleSubmit}
                className="mt-8 w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md text-lg font-semibold"
                disabled={Object.values(errors).some((error) => error)}
                data-aos="fade-up"
                data-aos-delay="500"
              >
                Save Changes
              </button>
            )}

            {/* Success and Error Messages */}
            {successMessage && (
              <p className="mt-4 text-green-600 text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Popups */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-purple-700">Change Profile Picture</h3>
            <button
              onClick={handleRemovePicture}
              className="text-red-500 hover:underline mb-4 block"
            >
              Remove Picture
            </button>
            <div className="mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100"
              />
            </div>
            {changesMade && (
              <button
                onClick={handleSavePicture}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {adminPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <AdminAccessForm onCancel={handleAdminFormCancel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;