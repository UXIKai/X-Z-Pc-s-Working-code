import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin, FaSun, FaMoon } from "react-icons/fa";
import "./profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Kai Dev",
    email: "kai@example.com",
    bio: "Tech enthusiast. Building the future one part at a time.",
    avatar: "https://via.placeholder.com/120",
    role: "Full Stack Developer",
    joined: "January 2024",
    location: "San Francisco, CA",
    twitter: "kaidev",
    github: "kaidevhub",
    linkedin: "kaidev",
  });

  const userPosts = [
    {
      id: 1,
      title: "Budget AMD Gaming Build",
      createdAt: "2 hours ago",
      upvotes: 32,
      comments: 6,
    },
    {
      id: 2,
      title: "RTX 4070 Beast Build for Streaming",
      createdAt: "1 day ago",
      upvotes: 78,
      comments: 14,
    },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(formData.avatar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setAvatarPreview(newUrl);
    }
  };

  const handleSave = () => {
    setFormData((prev) => ({ ...prev, avatar: avatarPreview }));
    setIsEditing(false);
  };

  const toggleEdit = () => setIsEditing(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`profile-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="profile-header">
        <div>
          <img src={avatarPreview} alt="Avatar" className="profile-avatar" />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="avatar-upload"
            />
          )}
        </div>

        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="profile-input"
              />
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="profile-input"
              />
            </>
          ) : (
            <>
              <h2 className="profile-name">{formData.name}</h2>
              <p className="profile-role">{formData.role}</p>
            </>
          )}
        </div>

        <div className="profile-controls">
          <button
            className="edit-profile-btn"
            onClick={isEditing ? handleSave : toggleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button className="toggle-mode-btn" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-box">
          <p className="detail-title">Email</p>
          {isEditing ? (
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <p className="detail-value">{formData.email}</p>
          )}
        </div>

        <div className="detail-box">
          <p className="detail-title">Location</p>
          {isEditing ? (
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <p className="detail-value">{formData.location}</p>
          )}
        </div>

        <div className="detail-box">
          <p className="detail-title">Joined</p>
          <p className="detail-value">{formData.joined}</p>
        </div>

        <div className="detail-box">
          <p className="detail-title">Bio</p>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="profile-textarea"
            />
          ) : (
            <p className="detail-value">{formData.bio}</p>
          )}
        </div>
      </div>

      <div className="social-links">
        <a href={`https://twitter.com/${formData.twitter}`} target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href={`https://github.com/${formData.github}`} target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a href={`https://linkedin.com/in/${formData.linkedin}`} target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
      </div>

      <div className="build-stats">
        <h3>PC Builder Stats</h3>
        <ul>
          <li>💻 Builds Created: <strong>8</strong></li>
          <li>🛠️ Parts Added to Cart: <strong>52</strong></li>
          <li>⭐ Average Rating: <strong>4.8 / 5</strong></li>
        </ul>
      </div>

      <div className="profile-forum-posts">
        <h3>User Forum Posts</h3>
        <div className="forum-post-list">
          {userPosts.map((post) => (
            <Link key={post.id} to={`/forums/${post.id}`} className="forum-post-card">
              <div className="forum-post-title">{post.title}</div>
              <div className="forum-post-meta">
                Posted {post.createdAt} • 🔼 {post.upvotes} • 💬 {post.comments}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <Link to="/" className="profile-back-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default Profile;
