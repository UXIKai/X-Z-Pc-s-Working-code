import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buildforum.css";

const mockPosts = [
  {
    id: 1,
    title: "Budget AMD Gaming Build",
    author: "techguy21",
    upvotes: 32,
    comments: 6,
    createdAt: "2 hours ago",
    body: "This is my budget build with Ryzen 5 and RX 6600. Runs great for under $600.",
  },
  {
    id: 2,
    title: "RTX 4070 Beast Build for Streaming",
    author: "buildqueen",
    upvotes: 78,
    comments: 14,
    createdAt: "1 day ago",
    body: "Using an i7-13700K and RTX 4070 in a Meshify C. Great thermals and quality stream performance.",
  },
];

const savedPosts = [
  { id: 101, title: "My Dream Build" },
  { id: 102, title: "Silent Budget PC" },
  { id: 103, title: "RGB Watercooled Setup" },
];

const trendingPosts = [
  { id: 201, title: "Ultimate Budget Killer Build" },
  { id: 202, title: "Next-Gen VR Ready PC" },
  { id: 203, title: "Tiny But Mighty Mini ITX Build" },
];

function ForumPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockPosts);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", author: "", body: "" });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = newPost.title.trim();
    const trimmedAuthor = newPost.author.trim();

    if (!trimmedTitle || !trimmedAuthor) return;

    const newEntry = {
      id: Date.now(),
      title: trimmedTitle,
      author: trimmedAuthor,
      body: newPost.body.trim(),
      upvotes: 0,
      comments: 0,
      createdAt: "just now",
    };

    setPosts([newEntry, ...posts]);
    setNewPost({ title: "", author: "", body: "" });
    setShowForm(false);
  };

  const handlePostClick = (postId) => {
    navigate(`/forum/${postId}`);
  };

  return (
    <div className="forum-layout">
      {/* Left Sidebar: Saved Forums */}
      <aside className="saved-sidebar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2>📁 Saved Forums</h2>
        <ul className="saved-list">
          {savedPosts.map((post) => (
            <li
              key={post.id}
              className="saved-item"
              onClick={() => handlePostClick(post.id)}
              style={{ cursor: "pointer" }}
            >
              {post.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Forum Area */}
      <main className="forum-main">
        <header className="forum-header">
          <h1>X-Z Build Forum</h1>
          <p>Share your PC builds, get feedback, and explore what others are building.</p>
          <button className="create-post-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Create Build Post"}
          </button>
        </header>

        {showForm && (
          <form className="post-form" onSubmit={handlePostSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={newPost.title}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Your Name"
              value={newPost.author}
              onChange={handleFormChange}
              required
            />
            <textarea
              name="body"
              placeholder="Tell us about your build..."
              value={newPost.body}
              onChange={handleFormChange}
              rows={5}
            />
            <button type="submit">📤 Submit Post</button>
          </form>
        )}

        <section className="forum-posts">
          {posts.map((post) => (
            <div
              key={post.id}
              className="forum-post"
              onClick={() => handlePostClick(post.id)}
              style={{ cursor: "pointer" }}
            >
              <h2>{post.title}</h2>
              <div className="meta">
                Posted by <strong>{post.author}</strong> • {post.createdAt}
              </div>
              <div className="body-preview">
                {post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}
              </div>
              <div className="stats">
                <span>🔼 {post.upvotes} upvotes</span>
                <span>💬 {post.comments} comments</span>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Right Sidebar: Trending Forums */}
      <aside className="trending-sidebar">
        <h2>🔥 Trending Forums</h2>
        <ul className="trending-list">
          {trendingPosts.map((post) => (
            <li
              key={post.id}
              className="trending-item"
              onClick={() => handlePostClick(post.id)}
              style={{ cursor: "pointer" }}
            >
              {post.title}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default ForumPage;
