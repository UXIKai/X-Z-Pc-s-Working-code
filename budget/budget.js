import React from "react";
import "./BudgetBuild.css";

const budgetBuild = {
  name: "Budget Gaming Beast",
  specs: [
    {
      name: "Ryzen 5 5600",
      img: "https://source.unsplash.com/featured/?ryzen",
      link: "https://www.amazon.com/dp/B091GGZT1S",
    },
    {
      name: "RTX 3060",
      img: "https://source.unsplash.com/featured/?rtx3060",
      link: "https://www.amazon.com/dp/B08WHJPBFX",
    },
    {
      name: "16GB DDR4 RAM",
      img: "https://source.unsplash.com/featured/?ddr4,ram",
      link: "https://www.amazon.com/dp/B08P3V572B",
    },
    {
      name: "1TB NVMe SSD",
      img: "https://source.unsplash.com/featured/?nvme,ssd",
      link: "https://www.amazon.com/dp/B07YD579WM",
    },
  ],
};

function BudgetBuild({ handleAddToCart }) {
  const addEntireBuild = () => {
    budgetBuild.specs.forEach((part) => handleAddToCart(part));
  };

  return (
    <div className="budget-build-container">
      <h1>{budgetBuild.name}</h1>
      <div className="parts-grid">
        {budgetBuild.specs.map((part, index) => (
          <div key={index} className="part-card">
            <img src={part.img} alt={part.name} />
            <h3>{part.name}</h3>
            <a href={part.link} target="_blank" rel="noopener noreferrer">
              View on Amazon
            </a>
            <button onClick={() => handleAddToCart(part)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <button className="add-full-build-btn" onClick={addEntireBuild}>
        ➕ Add Full Build to Cart
      </button>
    </div>
  );
}

export default BudgetBuild;
