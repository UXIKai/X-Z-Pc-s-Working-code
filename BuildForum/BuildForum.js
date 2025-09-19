import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buildforum.css";

const initialPosts = [
  {
    id: 1,
    title: "Budget AMD Gaming Build",
    author: "techguy21",
    upvotes: 32,
    comments: 6,
    createdAt: "2 hours ago",
    body: "Ryzen 5 5600, RX 6600, 16GB DDR4, 1TB NVMe, 650W PSU.",
  },
  {
    id: 2,
    title: "RTX 4070 Beast Build for Streaming",
    author: "buildqueen",
    upvotes: 78,
    comments: 14,
    createdAt: "1 day ago",
    body: "i7-13700K, RTX 4070, 32GB DDR5, 2TB SSD, 850W PSU.",
  },
];

const savedPosts = [
  { id: 101, title: "My Dream Build" },
  { id: 102, title: "Silent Budget PC" },
  { id: 103, title: "RGB Watercooled Setup" },
];

function ForumPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "", body: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) return;

    const newPost = {
      id: Date.now(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      body: formData.body.trim(),
      upvotes: 0,
      comments: 0,
      createdAt: "just now",
    };

    setPosts([newPost, ...posts]);
    setFormData({ title: "", author: "", body: "" });
    setShowForm(false);
  };

  const handlePostClick = (id) => {
    navigate(`/forum/${id}`);
  };

  const handleAuthorClick = (author, e) => {
    e.stopPropagation();
    navigate(`/user/${author}`);
  };

  return (
    <>
      <div className="forum-top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="corner-title">Tech Forum</h1>
        <div className="profile-icon" onClick={() => navigate("/profile")}>
          <img src="https://i.pravatar.cc/40?img=3" alt="Profile" />
        </div>
      </div>

      <div className="forum-layout">
        <aside className="saved-sidebar">
          <h2>Saved Forums</h2>
          <ul className="saved-list">
            {savedPosts.map((post) => (
              <li
                key={post.id}
                className="saved-item"
                onClick={() => handlePostClick(post.id)}
              >
                {post.title}
              </li>
            ))}
          </ul>
        </aside>

        <main className="forum-main">
          <header className="forum-header">
            <button
              className="create-post-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Create Build Post"}
            </button>
            <p>
              Share your PC builds, get feedback, and explore what others are building.
            </p>
          </header>

          {showForm && (
            <form className="post-form" onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Post Title"
                value={formData.title}
                onChange={handleInput}
                required
              />
              <input
                name="author"
                placeholder="Your Name"
                value={formData.author}
                onChange={handleInput}
                required
              />
              <textarea
                name="body"
                placeholder="Describe your build..."
                value={formData.body}
                onChange={handleInput}
                rows={4}
              />
              <button type="submit">📤 Submit</button>
            </form>
          )}

          <section className="forum-posts">
            {posts.map((post) => (
              <div
                key={post.id}
                className="forum-post"
                onClick={() => handlePostClick(post.id)}
              >
                <h2 className="clickable-title">{post.title}</h2>
                <div className="meta">
                  Posted by{" "}
                  <strong
                    className="clickable-author"
                    onClick={(e) => handleAuthorClick(post.author, e)}
                  >
                    {post.author}
                  </strong>{" "}
                  • {post.createdAt}
                </div>
                <div className="body-preview">
                  {post.body.length > 100
                    ? post.body.slice(0, 100) + "..."
                    : post.body}
                </div>
                <div className="stats">
                  <span>🔼 {post.upvotes} upvotes</span>
                  <span>💬 {post.comments} comments</span>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}

export default ForumPage;
