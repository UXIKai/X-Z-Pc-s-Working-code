import React from "react";
import { useNavigate } from "react-router-dom";
import "./favorite.css"; // Corrected path

function Favorites({ favorites = [], onRemoveFavorite = () => {} }) {
  const navigate = useNavigate();

return (
  <div className="favorites-page">
    <div className="favorites-header">
      <div className="header-left">
        <h1 className="favorites-title">★ Saved Items</h1>
      </div>
      <div className="header-right">
        <button className="techmart-button" onClick={() => navigate("/techmart")}>
          ⬅ Back to Tech-Mart
        </button>
      </div>
    </div>

      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p style={{ padding: "40px", textAlign: "center", fontSize: "18px" }}>
            You haven’t saved anything yet.
          </p>
        ) : (
          favorites.map((item, index) => (
            <div
              key={index}
              className="favorite-item"
              onClick={() => navigate(`/product/${index}`, { state: { product: item } })}
            >
              <img
                src={item.img || "https://via.placeholder.com/200"}
                alt={item.name}
                className="favorite-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/200";
                }}
              />
              <div className="favorite-info">
                <h3>{item.name}</h3>
                <p><strong>${(item.price || 0).toFixed(2)}</strong></p>
                <p>📍 {item.location}</p>
                <p>📦 {item.category}</p>
                <div className="favorite-actions">
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(item);
                    }}
                  >
                    💔 Remove
                  </button>
                  <button
                    className="buy-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${index}`, { state: { product: item } });
                    }}
                  >
                    👁️ View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
