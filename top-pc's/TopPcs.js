import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./TopPcs.css";

const topBuilds = [
  {
    name: "Budget Gaming Beast",
    images: [
      "/AMDRyzen5In.jpg",
      "/NVIDIAGeForceRTX3060.jpg",
      "Corsair Vengeance LPX 16GB DDR4 3200MHz.jpg",
      "WD Black SN770 1TB NVMe SSD.jpg",
      "Cooler Master 120mm RGB Fan.jpg",
      "NZXT H510 Mid Tower.jpg",
    ],
    specs: [
      "CPU: AMD Ryzen 5 5600",
      "GPU: NVIDIA GeForce RTX 3060 (MSI Ventus 2X)",
      "RAM: Corsair Vengeance LPX 16GB DDR4 3200MHz",
      "Storage: WD Black SN770 1TB NVMe SSD",
      "Cooling: Cooler Master 120mm RGB Fan",
      "Case: NZXT H510 Mid Tower",
    ],
    label: "1080p High Performance",
    price: "$999",
  },
  {
    name: "Content Creation Pro",
    images: [
      "/IntelCorei7In.jpg",
      "/ASUSIn.jpg",
      "/G.SkillIn.jpg",
      "/samsunIn.jpg",
      "/Noctuain.jpg",
      "/FractIn.jpg",
    ],
    specs: [
      "CPU: Intel Core i7-13700K",
      "GPU: ASUS ROG Strix RTX 4070 12GB",
      "RAM: G.Skill Trident Z5 32GB DDR5 6000MHz",
      "Storage: Samsung 980 Pro 2TB NVMe Gen4 SSD",
      "Cooling: Noctua NH-U12A Air Cooler",
      "Case: Fractal Design Meshify C White",
    ],
    label: "4K Video Editing",
    price: "$1,799",
  },
  {
    name: "Ultimate Gaming Rig",
    images: [
      "/Ryz9in4.jpg",
      "/4090in4.jpg",
      "/CorDom.jpg",
      "/Sabin.jpg",
      "/Lian Li UNL Fan SL -infinitiy.jpg",
      "/Lian Li O11.jpg",
    ],
    specs: [
      "CPU: AMD Ryzen 9 7950X",
      "GPU: NVIDIA RTX 4090 Founders Edition",
      "RAM: Corsair Dominator Platinum 64GB DDR5 6000MHz",
      "Storage: Sabrent Rocket 4 Plus 4TB NVMe SSD",
      "Cooling: Lian Li Uni Fan SL-Infinity 120mm",
      "Case: Lian Li O11 Dynamic XL",
    ],
    label: "4K Ultra + Streaming",
    price: "$3,499",
  },
];

function TopPcs() {
  const navigate = useNavigate();

return (
  <div className="top-pcs-wrapper">
    {/* Back Button Bar */}
    <div className="top-bar-full">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: 8 }} />
        Back
      </button>
      <h1 className="top-tech-title">Top-Tech</h1>
    </div>

      {/* Top PC Builds */}
      <div className="top-pcs-container">
        <h1>Top PC Builds</h1>
        <div className="builds-flex">
          {topBuilds.map((build, index) => (
            <div className="build-card" key={index}>
              <div className="parts-grid">
                {build.images.map((imgSrc, i) => (
                  <img
                    key={i}
                    src={imgSrc}
                    alt={`${build.name} part ${i + 1}`}
                    className="part-image"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                ))}
              </div>
              <div className="build-name">{build.name}</div>
              <ul className="build-specs">
                {build.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
              <span className="performance-label">{build.label}</span>
              <div className="build-price">{build.price}</div>
              <button
                className="view-btn"
                onClick={() => alert(`Viewing: ${build.name}`)}
              >
                View Build
              </button>
            </div>
          ))}
        </div>

        {/* Top Tech Section */}
        <h1 style={{ marginTop: "60px" }}>Top Tech</h1>
        <div className="builds-flex">
          <div className="build-card">
            <img
              src="SteelSeries Apex Pro TKL.jpg"
              alt="SteelSeries Apex Pro TKL"
              className="build-image"
            />
            <div className="build-name">SteelSeries Apex Pro TKL</div>
            <ul className="build-specs">
              <li>OmniPoint Adjustable Switches</li>
              <li>Per-Key RGB Lighting</li>
              <li>Aircraft-grade aluminum frame</li>
            </ul>
            <span className="performance-label">Pro Typing & Gaming</span>
            <div className="build-price">$179</div>
            <button
              className="view-btn"
              onClick={() =>
                window.open(
                  "https://www.amazon.com/SteelSeries-Apex-Pro-TKL-Mechanical/dp/B0BVMW1YMX",
                  "_blank"
                )
              }
            >
              View Tech
            </button>
          </div>

          <div className="build-card">
            <img
              src="https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_SL1500_.jpg"
              alt="LG UltraGear 27GP950-B"
              className="build-image"
            />
            <div className="build-name">LG UltraGear 27GP950-B</div>
            <ul className="build-specs">
              <li>4K UHD Nano IPS Display</li>
              <li>144Hz Refresh Rate (OC 160Hz)</li>
              <li>1ms Response | G-SYNC Compatible</li>
            </ul>
            <span className="performance-label">Visual Excellence</span>
            <div className="build-price">$699</div>
            <button
              className="view-btn"
              onClick={() =>
                window.open(
                  "https://www.amazon.com/LG-UltraGear-27GP950-B-Compatibility-Adjustable/dp/B09727K2FD",
                  "_blank"
                )
              }
            >
              View Tech
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopPcs;
