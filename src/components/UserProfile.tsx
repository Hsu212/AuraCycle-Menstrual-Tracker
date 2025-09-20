import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import '../styles/UserProfile.css';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

interface UserProfileProps {
  user: UserData | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(
    user || {
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: 'https://avatar.iran.liara.run/public', // Default avatar
    }
  );
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(
      user || {
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: 'https://avatar.iran.liara.run/public', // Default avatar
      }
    );
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      setError('Name fields are required');
      return;
    }
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: `${formData.firstName} ${formData.lastName}`,
          avatar_url: formData.profilePicture || 'https://avatar.iran.liara.run/public',
        },
      });
      if (updateError) throw updateError;
      setIsEditing(false);
      setError('');
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/signin');
    } catch (error: any) {
      setError(error.message || 'Logout failed');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="profile-title">Your Aura Profile</h1>
          <p className="profile-subtitle">Manage your personal details</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="profile-content">
          <div className="profile-picture">
            <img
              src={formData.profilePicture || 'https://avatar.iran.liara.run/public'}
              alt="Profile"
              className="profile-img"
            />
            {isEditing && (
              <div className="input-group">
                <input
                  type="text"
                  name="profilePicture"
                  placeholder="Profile Picture URL"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  className="input-field"
                />
                <span className="input-icon">🖼️</span>
              </div>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <span className="input-icon">👤</span>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <span className="input-icon">👤</span>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  className="input-field"
                  disabled
                />
                <span className="input-icon">✉️</span>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-button">Save Changes</button>
                <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <p>
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="profile-footer">
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
          <p className="back-link">
            <Link to="/">Back to Home</Link>
          </p>
        </div>
      </div>

      <div className="profile-decoration">
        <div className="floating-heart">💖</div>
        <div className="floating-flower">🌸</div>
        <div className="floating-heart">💕</div>
        <div className="floating-star">✨</div>
      </div>
    </div>
  );
};

export default UserProfile;