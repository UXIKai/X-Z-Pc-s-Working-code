import React from "react";
import "./Forums.css";

// Sample posts - can be replaced with dynamic data later
const mockPosts = [
  {
    id: 1,
    title: "Budget AMD Gaming Build",
    author: "techguy21",
    upvotes: 32,
    comments: 6,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    title: "RTX 4070 Beast Build for Streaming",
    author: "buildqueen",
    upvotes: 78,
    comments: 14,
    createdAt: "1 day ago",
  },
  {
    id: 3,
    title: "Help: MicroATX case with 3 fan GPU?",
    author: "sffmaster",
    upvotes: 15,
    comments: 9,
    createdAt: "5 hours ago",
  },
];

function ForumPage() {
  const handleCreatePost = () => {
    // Placeholder for navigation or modal
    alert("Create post clicked!");
  };

  return (
    <main className="forum-container">
      {/* Header Section */}
      <section className="forum-header">
        <h1 className="forum-title">X-Z Build Forum</h1>
        <p className="forum-subtitle">
          Browse, share, and get feedback on PC builds from the X-Z community.
        </p>
        <button className="create-post-button" onClick={handleCreatePost}>
          + Create Build Post
        </button>
      </section>

      {/* Post List */}
      <section className="forum-post-list">
        {mockPosts.map((post) => (
          <article key={post.id} className="forum-post">
            <h2 className="post-title">{post.title}</h2>
            <div className="post-meta">
              Posted by <strong>{post.author}</strong> • {post.createdAt}
            </div>
            <div className="post-stats">
              <span>🔼 {post.upvotes} upvotes</span>
              <span>💬 {post.comments} comments</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default ForumPage;
