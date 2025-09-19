import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../cartpage.css";

function CartPage({ cart = [], onRemove = () => {} }) {
  const navigate = useNavigate();

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0),
    [cart]
  );

  return (
    <main className="cart-page" style={{ minHeight: "100vh", padding: "24px 16px", background: "#f7f7f8" }}>
      <div
        className="cart-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 6px 18px rgba(0,0,0,.06)",
          padding: 16,
        }}
      >
        {/* Forum-style header with back button + centered title */}
        <section
          className="cart-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

          <div style={{ textAlign: "center", flex: 1 }}>
            <h1 className="cart-title" style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#111" }}>
              Shopping Cart
            </h1>
            <p className="cart-subtitle" style={{ marginTop: 6, color: "#666", fontSize: 13 }}>
              Review items and proceed to checkout.
            </p>
          </div>

          {/* spacer to balance the centered title */}
          <div style={{ width: 96 }} />
        </section>

        {/* Content area */}
        {cart.length === 0 ? (
          <div
            className="empty-cart"
            style={{
              border: "1px dashed #ddd",
              borderRadius: 10,
              padding: 20,
              textAlign: "center",
              color: "#555",
              background: "#fafafa",
            }}
          >
            No items in cart.
          </div>
        ) : (
          <div
            className="cart-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) 320px",
              gap: 16,
              alignItems: "start",
            }}
          >
            {/* Items list */}
            <section
              className="cart-items-card"
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                padding: 12,
                background: "#fff",
              }}
            >
              <ul className="cart-item-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {cart.map((item, idx) => (
                  <li
                    key={`${item.name}-${idx}`}
                    className="cart-item"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "72px 1fr auto",
                      gap: 12,
                      alignItems: "center",
                      padding: "10px 6px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="cart-item-img"
                        style={{
                          width: 72,
                          height: 54,
                          objectFit: "cover",
                          borderRadius: 8,
                          background: "#f0f0f0",
                          border: "1px solid #eee",
                        }}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "";
                          e.currentTarget.alt = `${item.name} (image unavailable)`;
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 72,
                          height: 54,
                          borderRadius: 8,
                          background: "#f0f0f0",
                          border: "1px solid #eee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#999",
                          fontWeight: 700,
                        }}
                      >
                        —
                      </div>
                    )}

                    <div className="cart-item-info" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span className="cart-item-name" style={{ fontWeight: 700, color: "#111" }}>
                        {item.name}
                      </span>
                      {item.brand && (
                        <span className="cart-item-brand" style={{ fontSize: 12, color: "#666" }}>
                          {item.brand}
                        </span>
                      )}
                      {item.price != null && (
                        <span className="cart-item-price" style={{ fontSize: 13, color: "#111" }}>
                          ${Number(item.price).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => onRemove(idx)}
                      title="Remove item"
                      style={{
                        border: "1px solid #ddd",
                        background: "#fff",
                        color: "#111",
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Summary / checkout aside (sticky) */}
            <aside
              className="cart-summary"
              style={{
                position: "sticky",
                top: 16,
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                background: "#fff",
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: 16, color: "#111" }}>Total</strong>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#111" }}>
                  ${total.toFixed(2)}
                </div>
              </div>

              <button
                className="checkout-btn"
                style={{
                  marginTop: 8,
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 12px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,.12)",
                }}
              >
                Proceed to Checkout
              </button>

              <button
                className="back-btn"
                style={{ marginTop: 8 }}
                onClick={() => navigate("/")}
              >
                ← Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
