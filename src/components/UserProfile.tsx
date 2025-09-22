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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(formData.profilePicture);
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
    setPreviewUrl(formData.profilePicture);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadProfilePicture = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures') // Assume a bucket named 'profile-pictures'; create it if needed
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      setError('Name fields are required');
      return;
    }
    try {
      let updatedProfilePicture = formData.profilePicture;

      if (selectedFile) {
        updatedProfilePicture = await uploadProfilePicture(selectedFile);
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: `${formData.firstName} ${formData.lastName}`,
          avatar_url: updatedProfilePicture,
        },
      });
      if (updateError) throw updateError;

      setFormData({
        ...formData,
        profilePicture: updatedProfilePicture,
      });
      setSelectedFile(null);
      setPreviewUrl(updatedProfilePicture);
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
              src={previewUrl || 'https://avatar.iran.liara.run/public'}
              alt="Profile"
              className="profile-img"
            />
            {isEditing && (
              <div className="input-group file-input-group">
                <label htmlFor="profilePicture" className="file-label">Choose Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="input-field file-input"
                />
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
