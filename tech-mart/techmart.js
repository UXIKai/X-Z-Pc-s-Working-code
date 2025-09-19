import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaArrowLeft, FaHeart, FaUser } from "react-icons/fa"; // Add this import if using react-icons
import "./techmart.css";

function TechMart({
  listings = [],
  userId = null,
  onAddToCart = () => {},
  onDelete = () => {}
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const categories = [...new Set(listings.map(item => item?.category).filter(Boolean))];
  const locations = [...new Set(listings.map(item => item?.location).filter(Boolean))];

  const filteredListings = listings
    .filter(item => {
      const nameMatch = item?.name?.toLowerCase().includes(search.toLowerCase());
      const categoryMatch = !selectedCategory || item?.category === selectedCategory;
      const locationMatch = !locationFilter || item?.location === locationFilter;
      return nameMatch && categoryMatch && locationMatch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const toggleFavorite = (e, item) => {
    e.stopPropagation();
    const exists = favorites.find(fav => fav.name === item.name);
    if (exists) {
      setFavorites(prev => prev.filter(fav => fav.name !== item.name));
    } else {
      setFavorites(prev => [...prev, item]);
    }
  };

  return (
    <div className="techmart-page">
      {/* Top Bar */}
      <div className="techmart-top-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
      <FaArrowLeft style={{ marginRight: 7 }} /> Back
  
    </button>

        <h2 className="techmart-logo" onClick={() => navigate("/")}>Tech-Mart</h2>
        <input
          className="techmart-search"
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
<div className="top-bar-icons">
 
  <div className="add-back-pair">
    <button className="profile-btn" onClick={() => navigate("/sell")}>
      <FaPlus style={{ marginRight: 6 }} /> Add Product
    </button>
  </div>
  <button className="profile-btn" onClick={() => navigate("/favorites")}>
    <FaHeart style={{ marginRight: 6 }} /> Favorites
  </button>
  <button className="profile-btn" onClick={() => navigate("/profile")}>
    <FaUser style={{ marginRight: 6 }} /> Profile
  </button>
</div>

      </div>

      {/* Layout */}
      <div className="techmart-layout">
        {/* Sidebar */}
        <aside className="techmart-sidebar">
          <h3>Category</h3>
          <ul className="category-list">
            <li className={!selectedCategory ? "active" : ""} onClick={() => setSelectedCategory("")}>All Categories</li>
            {categories.map((cat, i) => (
              <li
                key={i}
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>

          <h3>Location</h3>
          <select className="location-filter" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>{loc}</option>
            ))}
          </select>

          <h3>Sort By</h3>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </aside>

        {/* Grid */}
        <main className="techmart-grid">
          {filteredListings.length === 0 ? (
            <p className="no-results">No items found.</p>
          ) : (
            filteredListings.map((item, index) => (
              <div
                key={index}
                className="techmart-item"
                onClick={() => navigate(`/product/${index}`, { state: { product: item } })}
                style={{ position: "relative" }}
              >
                {/* Three Dot Menu */}
                {item?.ownerId === userId && (
                  <div
                    className="three-dots"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenIndex(menuOpenIndex === index ? null : index);
                    }}
                  >
                    ⋮
                    {menuOpenIndex === index && (
                      <div className="menu-dropdown">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item);
                            setMenuOpenIndex(null);
                          }}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Image */}
                <img
                  src={item?.img || "https://via.placeholder.com/200"}
                  alt={item?.name || "Product"}
                  className="techmart-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/200";
                  }}
                />

                {/* Info */}
                <div className="techmart-info">
                  <h4 title={item?.name}>{item?.name}</h4>
                  <p><strong>${(item?.price || 0).toFixed(2)}</strong></p>
                  <p>📍 {item?.location}</p>
                  <p>📦 {item?.category}</p>

                  {item?.isNew && <span className="tag-new">New</span>}
                  {item?.discount && <span className="tag-discount">-{item.discount}%</span>}

                  {/* Actions */}
                  <div className="techmart-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                        alert("Added to cart!");
                      }}
                      title="Buy Now"
                    >
                      🛒 Buy
                    </button>

                    <button
                      className="save-button"
                      onClick={(e) => toggleFavorite(e, item)}
                      title={favorites.find(fav => fav.name === item.name) ? "Unsave" : "Save"}
                    >
                      {favorites.find(fav => fav.name === item.name) ? "💔" : "❤️"}
                    </button>

                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Are you sure you want to delete this product?")) {
                          onDelete(item);
                        }
                      }}
                      title="Delete Product"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default TechMart;
