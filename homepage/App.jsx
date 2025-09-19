import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";


import OrderRequest from "../Orders/Order&Request.js";
import "../Orders/Order&Request.css";
import ChatPage from "../chat/chatpage.js";
import CartPage from "../cart/cartpage.js";
import Profile from "../profile/profile.js";
import TechMart from "../tech-mart/techmart.js";
import TMProductPage from "../tech-mart/TMProductpage.js"; 
import SignupPage from "../signup/Signup.js";
import LoginPage from "../login/login.js";
import Favorites from "../favorite-tech/favorites.js";
import BuildForum from "../BuildForum/BuildForum.js";
import TopPcs from "../top-pc's/TopPcs.js";
import BuildBenchmark from "../BuildBenchmark/BuildBenchmark.js";

import { components } from "../components/componentsData.js";
import { techmartListings as initialListings } from "../tech-mart/techmartData.js";
import "./App.css";


function HomePage({ cart, handleAddToCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const navigate = useNavigate();

  const allBrands = useMemo(() => {
    const all = Object.values(components || {})
      .flat()
      .map((p) => p?.brand)
      .filter(Boolean);
    return Array.from(new Set(all)).sort();
  }, []);

  const handleBrandFilter = (e) => {
    const brand = e.target.value;
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const videoLinks = [
    { title: "Step-by-Step PC Build Guide", url: "https://www.youtube.com/embed/v7MYOpFONCU" },
    { title: "How to Choose PC Parts", url: "https://www.youtube.com/embed/lPIXAtNGGCw" },
    { title: "What Does a CPU Do?", url: "https://www.youtube.com/embed/dWGujFI4AYQ" },
    { title: "What is a GPU?", url: "https://www.youtube.com/embed/LfdK-v0SbGI" },
    { title: "What is RAM?", url: "https://www.youtube.com/embed/PVad0c2cljo" },
    { title: "SSD vs HDD", url: "https://www.youtube.com/embed/1cyMTl_QXSc" },
    { title: "How Motherboards Work", url: "https://www.youtube.com/embed/zxGqGCtPxn4" },
    { title: "Front Panel Cable Guide", url: "https://www.youtube.com/embed/xT36IDSQBX4" },
    { title: "Thermal Paste Tutorial", url: "https://www.youtube.com/embed/LHOBRvXYqEg" },
    { title: "Cable Management", url: "https://www.youtube.com/embed/c3dggnkaEs8" },
    { title: "Every Component in 3 Minutes", url: "https://www.youtube.com/embed/RqQ8SQqjlGk" }
  ];

  return (
    <div className="App.jsx">
      {/* === TOP BAR === */}
      <div className="top-bar" role="navigation" aria-label="Top navigation">
        <div className="top-left-auth">
          <button className="auth-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="auth-btn" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>

        <div className="top-action-bar">
          <button className="nav-btn" onClick={() => navigate("/top-pcs")}>🖥️ Top-Tech</button>
          <button className="nav-btn" onClick={() => navigate("/forum")}>💬 Tech Forum</button>
          <button className="nav-btn" onClick={() => navigate("/build-benchmark")}>🧪 Build Benchmark</button>
          <button className="nav-btn" onClick={() => navigate("/techmart")}>🛒 Tech-Mark</button>
        </div>

        <div className="top-right-icons">
          <Link to="/profile" className="chat-icon" title="Profile" aria-label="Profile">👤</Link>
          <Link to="/chat" className="chat-icon" title="Chat" aria-label="Chat">💬</Link>
          <Link to="/cart" className="cart-icon" title="Cart" aria-label="Cart">
            🛒 <span className="cart-count" aria-live="polite">{cart.length}</span>
          </Link>
          <button
            className="order-request-btn"
            onClick={() => setShowOrderModal(true)}
            aria-haspopup="dialog"
            aria-expanded={showOrderModal}
          >
            📦 Order's
          </button>
        </div>
      </div>

      {showOrderModal && <OrderRequest onClose={() => setShowOrderModal(false)} />}

      <div className="main-layout">
        <div className="content-area">
          <div className="logo-container">
            <h1 className="site-logo">X-Z</h1>
            <p className="logo-subtext">Build Smarter. Build Faster.</p>
          </div>

          <div className="search-bar-with-filter">
            <input
              type="text"
              className="search-input"
              placeholder="Search parts…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search parts"
            />
            <button
              className="hamburger-icon"
              onClick={() => setIsFilterOpen((o) => !o)}
              aria-expanded={isFilterOpen}
              aria-controls="brand-filter-panel"
            >
              ☰
            </button>
          </div>

          {isFilterOpen && (
            <div id="brand-filter-panel" className="floating-filter-panel">
              <h3>Filter by Brand</h3>
              <button className="clear-filters-btn" onClick={() => setSelectedBrands([])}>Clear Filters</button>
              <div className="brand-filter-container">
                {allBrands.map((brand) => (
                  <label key={brand} className="brand-filter-label">
                    <input
                      type="checkbox"
                      value={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={handleBrandFilter}
                    />
                    {brand}
                  </label>
                ))}np
              </div>
            </div>
          )}

          <div className="component-content">
            {Object.entries(components || {}).map(([category, parts]) => {
              const filteredParts = (parts || []).filter((part) => {
                const n = (part?.name || "").toLowerCase();
                const b = part?.brand || "";
                const matchesSearch = n.includes(searchQuery.toLowerCase());
                const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(b);
                return matchesSearch && matchesBrand;
              });

              if (filteredParts.length === 0) return null;

              return (
                <div key={category} className="component-section" id={String(category).toLowerCase()}>
                  <h2 className="component-title">{category}</h2>
                  <div className="options-row">
                    {filteredParts.map((part) => (
                      <div key={`${part.name}-${part.brand}`} className="option-box">
                        <img
                          src={part.img}
                          alt={part.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = "";
                            e.currentTarget.alt = `${part.name} (image unavailable)`;
                          }}
                        />
                        <div className="item-label">
                          <a href={part.link} target="_blank" rel="noopener noreferrer">
                            {part.name}
                          </a>
                        </div>
                        <button
                          className="add-cart-btn"
                          onClick={() => handleAddToCart(part)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="video-carousel">
            <h2 className="component-title">Essentials for Beginners</h2>
            <div className="video-row">
              {videoLinks.map((video, i) => (
                <iframe
                  key={video.url + i}
                  className="video-frame"
                  src={video.url}
                  title={video.title}
                  loading="lazy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ))}
            </div>
          </div>

          <footer className="bottom-page-nav" role="contentinfo">
            <button>📧 Contact</button>
            <button>❓ Help</button>
            <button>ℹ️ About</button>
            <button>⚙️ Settings</button>
          </footer>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [cart, setCart] = useState([]);
  const [techmartListings, setTechmartListings] = useState(() => [...initialListings]);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  });
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("favorites", JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));
  const addProduct = (product) =>
    setTechmartListings((prev) => [product, ...prev]);
  const deleteProduct = (product) =>
    setTechmartListings((prev) => prev.filter((p) => p.id !== product.id));
  const removeFavorite = (item) =>
    setFavorites((prev) => prev.filter((f) => f.name !== item.name));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} handleAddToCart={addToCart} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        <Route path="/chat" element={<ChatPage user={user} />} />
        <Route path="/cart" element={<CartPage cart={cart} onRemove={removeFromCart} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/orders" element={<OrderRequest />} />
        <Route path="/forum" element={<BuildForum />} />
        <Route
          path="/techmart"
          element={
            <TechMart
              listings={techmartListings}
              userId={user?.id}
              onAddToCart={addToCart}
              onDelete={deleteProduct}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/sell" element={<TMProductPage onAddProduct={addProduct} />} />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} onRemoveFavorite={removeFavorite} />}
        />
        <Route path="/top-pcs" element={<TopPcs />} />
        <Route path="/build-benchmark" element={<BuildBenchmark />} />
        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
