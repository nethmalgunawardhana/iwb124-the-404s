import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const SettingsContent = () => {
  const [avatar, setAvatar] = useState("../user.png");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    city: '',
    province: ''
  });
  const [errors, setErrors] = useState({});

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.province.trim()) newErrors.province = "Province is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to a server
    }
  };

  return (
    <div className="w-[100%] bg-white p-[20px] rounded-md min-h-screen md:w-[100%] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]">
    <div className="w-full text-black max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">General Settings</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Avatar</h2>
        <div className="flex items-center space-x-4">
          <img src={avatar} alt="User avatar" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <label className="text-blue-500 hover:underline cursor-pointer">
              Change
              <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
            </label>
            <button className="text-blue-500 hover:underline ml-4" onClick={() => setAvatar("/api/placeholder/150/150")}>Remove</button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Cover photo</h2>
        <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg relative">
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover" className="w-full h-32 object-cover" />
          ) : (
            <>
              <Camera className="mx-auto mb-2" size={24} />
              <p>Drag image here, or <label className="text-blue-500 hover:underline cursor-pointer">Browse Files
                <input type="file" className="hidden" onChange={handleCoverPhotoChange} accept="image/*" />
              </label></p>
            </>
          )}
        </div>
        {coverPhoto && (
          <button className="text-blue-500 hover:underline mt-2" onClick={() => setCoverPhoto(null)}>Remove</button>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Basic information</h2>
        <p className="text-sm text-gray-600 mb-4">Update some personal information. Your address will never be publicly available.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input 
                type="text" 
                name="firstName"
                placeholder="First name" 
                className={`w-full bg-white p-2 border rounded ${errors.firstName ? 'border-red-500' : ''}`}
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                className={`w-full bg-white p-2 border rounded ${errors.lastName ? 'border-red-500' : ''}`}
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <input 
              type="text" 
              name="username"
              placeholder="Username" 
              className={`w-full p-2 bg-white border rounded ${errors.username ? 'border-red-500' : ''}`}
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className={`w-full bg-white p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone" 
              className={`w-full bg-white p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input 
                type="text" 
                name="city"
                placeholder="City" 
                className={`w-full bg-white p-2 border rounded ${errors.city ? 'border-red-500' : ''}`}
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <input 
                type="text" 
                name="province"
                placeholder="Province" 
                className={`w-full bg-white p-2 border rounded ${errors.province ? 'border-red-500' : ''}`}
                value={formData.province}
                onChange={handleInputChange}
              />
              {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SettingsContent;