import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { auth } from "../firebase/firebase";
import { updateProfile } from "firebase/auth";
import AdminAccessForm from "./AdminAccessForm";
import manImage from "../assets/man.png";
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

        alert("Changes saved successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to save changes. Please try again.");
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
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between max-w-6xl mx-auto p-6">
        {/* Left side - Man Image */}
        <div
          className="hidden md:block w-1/3"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <img
            src={manImage}
            alt="Decorative man illustration"
            style={{ height: "600px", width: "100%" }}
          />
        </div>

        {/* Right side - Profile Content */}
        <div
          className="w-full md:w-2/3 md:ml-8"
          data-aos="fade-left"
          data-aos-duration="1200"
        >
          <div className="bg-white rounded-lg shadow-md relative p-6">
            <h2
              className="text-2xl font-bold mb-6 text-center text-purple-600"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              User Profile
            </h2>
            <button
              onClick={handleGetAdminAccess}
              className="absolute top-4 right-4 px-4 py-2 text-sm md:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-800"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <span className="hidden md:inline">Event Creator Access</span>
              <span className="md:hidden">Creator Access</span>
            </button>
            <div
              className="flex items-center justify-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <img
                    className={`h-32 w-32 rounded-full object-cover border-4 ${
                      userInfo.verified
                        ? "border-yellow-500"
                        : "border-purple-500"
                    } cursor-pointer hover:opacity-80 transition-all duration-300`}
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
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white text-purple-600 ${
                    isEditing ? "cursor-text" : "cursor-not-allowed"
                  }`}
                  value={userInfo.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white text-purple-600 cursor-not-allowed"
                  value={userInfo.email}
                  disabled={true}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Save Changes Button */}
            {isEditing && (
              <button
                onClick={handleSubmit}
                className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300"
                disabled={Object.values(errors).some((error) => error)}
                data-aos="fade-up"
                data-aos-delay="500"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Popups remain unchanged */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-bold mb-4">Change Profile Picture</h3>
            <button
              onClick={handleRemovePicture}
              className="text-red-500 hover:underline"
            >
              Remove Picture
            </button>
            <div className="my-4">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {changesMade && (
              <button
                onClick={handleSavePicture}
                className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {adminPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 sm:w-2/3 md:w-2/3 lg:w-1/3">
            <AdminAccessForm onCancel={handleAdminFormCancel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
