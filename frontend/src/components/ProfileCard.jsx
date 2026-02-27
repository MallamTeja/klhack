import React, { useState } from 'react';

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sharma Electronics',
    gstin: '27AAAPL1234C1ZV',
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'sharma.electronics@email.com'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes (you could add validation here)
      console.log('Profile updated:', profileData);
      alert('Profile updated successfully!');
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="card profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          <span>{profileData.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="profile-info">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="profile-name-input"
            />
          ) : (
            <h2>{profileData.name}</h2>
          )}
        </div>
        <button className="edit-profile-btn-small" onClick={handleEditToggle}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <label>GSTIN No:</label>
          {isEditing ? (
            <input
              type="text"
              name="gstin"
              value={profileData.gstin}
              onChange={handleInputChange}
              className="detail-input"
            />
          ) : (
            <span>{profileData.gstin}</span>
          )}
        </div>

        <div className="detail-item">
          <label>Gender:</label>
          {isEditing ? (
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleInputChange}
              className="detail-input"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span>{profileData.gender}</span>
          )}
        </div>

        <div className="detail-item">
          <label>Phone Number:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="detail-input"
            />
          ) : (
            <span>{profileData.phone}</span>
          )}
        </div>

        <div className="detail-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="detail-input"
            />
          ) : (
            <span>{profileData.email}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
