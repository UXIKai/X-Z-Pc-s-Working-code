import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./profile/buildforum.css";

function AuthorPage() {
  const { authorName } = useParams();
  const navigate = useNavigate();

  // Placeholder for now – later replace with real data from backend
  const mockAuthorProfiles = {
    techguy21: {
      name: "techguy21",
      bio: "PC builder and budget gaming enthusiast.",
      posts: [
        { id: 1, title: "Budget AMD Gaming Build" },
      ],
    },
    buildqueen: {
      name: "buildqueen",
      bio: "Streamer and hardware reviewer.",
      posts: [
        { id: 2, title: "RTX 4070 Beast Build for Streaming" },
      ],
    },
  };

  const author = mockAuthorProfiles[authorName];

  if (!author) {
    return (
      <div className="forum-main">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2>Author not found</h2>
      </div>
    );
  }

  return (
    <div className="forum-main">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h1>{author.name}</h1>
      <p className="author-bio">{author.bio}</p>

      <h3>Posts by {author.name}</h3>
      <ul className="author-post-list">
        {author.posts.map((post) => (
          <li
            key={post.id}
            className="clickable-title"
            onClick={() => navigate(`/forum/${post.id}`)}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorPage;
