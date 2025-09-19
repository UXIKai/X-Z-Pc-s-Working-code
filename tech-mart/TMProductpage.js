import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./techmart.css";

function TMProductPage({ onAddProduct }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    location: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, description, category, location, img } = form;

    if (!name || !price || !description || !category || !location || !img) {
      alert("🚫 Please fill out all fields before submitting.");
      return;
    }

    onAddProduct?.({ ...form, price: parseFloat(price) });
    alert("✅ Product added successfully!");
    navigate("/techmart");
  };

  return (
    <div className="techmart-page">
      <header className="techmart-top-bar">
        <h2 className="techmart-logo" onClick={() => navigate("/")}>Tech-Mart</h2>
      </header>

      <div className="form-box">
        <form className="product-form" onSubmit={handleSubmit}>
          {/* Header with inline Back button */}
          <div className="form-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Add a New Product</h3>
          </div>

          <label htmlFor="name">Title</label>
          <input
            id="name"
            name="name"
            placeholder="Enter product title"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Price ($)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            placeholder="Enter price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Describe the product..."
            value={form.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            placeholder="e.g. Electronics, Apparel"
            value={form.category}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            placeholder="Enter location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="img">Upload Image</label>
          <input
            id="img"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />

          {form.img && (
            <img
              src={form.img}
              alt="Preview"
              className="product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available";
              }}
            />
          )}
   <button type="submit" className="product-submit-button">
            Add Product
          </button>
     <button
  type="button"
  className="back-btn"
  onClick={() => navigate(-1)}
>
  ← Back to Tech-Mart
</button>

       
        </form>
      </div>
    </div>
  );
}

export default TMProductPage;
