import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuildBenchmark.css";
import { components } from "../components/componentsData.js";

/** Order the slots in a sensible visual flow */
const SLOT_MAP = [
  { id: "CPU", key: "CPU" },
  { id: "GPU", key: "GPU" },
  { id: "RAM", key: "RAM" },
  { id: "Storage", key: "Storage" },
  { id: "Motherboard", key: "Motherboard" },
  { id: "Case", key: "Cases" },
  { id: "PSU", key: "PSU" },
];

/** Compact score ring (SVG) */
function ScoreRing({ value = 0, size = 84, stroke = 8 }) {
  const v = Math.max(0, Math.min(100, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (v / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`Overall score ${v}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e6e6e9" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#111"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference - dash}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill="#111"
      >
        {v}
      </text>
    </svg>
  );
}

const BenchmarkPage = () => {
  const navigate = useNavigate();

  // Selected part per slot
  const [selected, setSelected] = useState({
    Case: null,
    CPU: null,
    GPU: null,
    Motherboard: null,
    RAM: null,
    Storage: null,
    PSU: null,
  });

  // Manual performance inputs
  const [perf, setPerf] = useState({
    cpuScore: 14230,
    gpuScore: 18950,
    ramSpeed: 5200,
    storageRead: 3450,
    storageWrite: 3100,
  });

  // Picker state
  const [openPicker, setOpenPicker] = useState({ open: false, slot: null });
  const [query, setQuery] = useState("");

  useEffect(() => window.scrollTo(0, 0), []);

  // Derived numbers
  const storageAvg = useMemo(
    () => (perf.storageRead + perf.storageWrite) / 2,
    [perf.storageRead, perf.storageWrite]
  );

  const overallScore = useMemo(() => {
    const score =
      (perf.cpuScore / 20000) * 25 +
      (perf.gpuScore / 20000) * 40 +
      (perf.ramSpeed / 6000) * 15 +
      (storageAvg / 5000) * 20;
    return Math.round(score);
  }, [perf, storageAvg]);

  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected]
  );
  const completion = Math.round((selectedCount / SLOT_MAP.length) * 100);

  // Picker helpers
  const onOpenPicker = (slotId) => setOpenPicker({ open: true, slot: slotId });
  const onClosePicker = () => {
    setOpenPicker({ open: false, slot: null });
    setQuery("");
  };

  const handlePick = (slotId, item) => {
    setSelected((prev) => ({ ...prev, [slotId]: item }));
    onClosePicker();
  };

  const clearSlot = (slotId) =>
    setSelected((prev) => ({ ...prev, [slotId]: null }));

  const clearAll = () =>
    setSelected({ Case: null, CPU: null, GPU: null, Motherboard: null, RAM: null, Storage: null, PSU: null });

  const updatePerf = (key) => (e) =>
    setPerf((p) => ({ ...p, [key]: Number(e.target.value) || 0 }));

  const resetPerf = () =>
    setPerf({
      cpuScore: 14230,
      gpuScore: 18950,
      ramSpeed: 5200,
      storageRead: 3450,
      storageWrite: 3100,
    });

  // Items shown in picker
  const itemsForSlot = useMemo(() => {
    if (!openPicker.open || !openPicker.slot) return [];
    const map = SLOT_MAP.find((m) => m.id === openPicker.slot);
    const list = (map && components?.[map.key]) || [];
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(
      (x) => x.name?.toLowerCase().includes(q) || x.brand?.toLowerCase().includes(q)
    );
  }, [openPicker, query]);

  return (
    <div className="benchmark-page">
      {/* 2-column shell: center main, score on the right */}
      <div
        className="benchmark-container"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 300px",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* MAIN (centered content) */}
        <div className="benchmark-main" style={{ maxWidth: 940, margin: "0 auto", width: "100%" }}>
          {/* ===== Forum-style Header with Back Button (only layout changed) ===== */}
          <section
            className="forum-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              gap: 12,
            }}
          >
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

            <div style={{ textAlign: "center", flex: 1 }}>
              <h1 className="forum-title" style={{ margin: 0 }}>BuildBenchmark</h1>
              <p className="forum-subtitle" style={{ marginTop: 6 }}>
                Select your parts, tweak performance values, and view your overall score.
              </p>
            </div>

            {/* spacer to balance layout like Forum header */}
            <div style={{ width: 96 }} />
          </section>

          {/* Slots */}
          <div className="slot-grid">
            {SLOT_MAP.map(({ id }) => {
              const item = selected[id];
              return (
                <div
                  key={id}
                  className={`slot-card ${item ? "filled" : ""}`}
                  role="button"
                  onClick={() => onOpenPicker(id)}
                >
                  <div className="slot-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{id}</span>
                    {item && (
                      <button
                        className="btn ghost"
                        style={{ padding: "4px 8px", fontSize: 11 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          clearSlot(id);
                        }}
                        aria-label={`Clear ${id}`}
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {item ? (
                    <div className="slot-body">
                      {item.img ? (
                        <img className="slot-img" src={item.img} alt={item.name} loading="lazy" />
                      ) : (
                        <div className="slot-placeholder-img">{item.brand?.[0] || "•"}</div>
                      )}
                      <div className="slot-meta">
                        <div className="slot-name">{item.name}</div>
                        <div className="slot-brand">{item.brand}</div>
                        <div className="slot-links">
                          {item.link && (
                            <a
                              className="slot-link"
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="slot-empty">Click to choose</div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn small" onClick={resetPerf} title="Reset the sample scores">
              Reset Scores
            </button>
            <button className="btn ghost" onClick={clearAll} title="Clear all selected parts">
              Clear All Parts
            </button>
          </div>

          {/* Results (grid) */}
          <div className="results-grid">
            <div className="benchmark-result">
              <span>CPU Score</span> {perf.cpuScore}
            </div>
            <div className="benchmark-result">
              <span>GPU Score</span> {perf.gpuScore}
            </div>
            <div className="benchmark-result">
              <span>RAM Speed</span> {perf.ramSpeed} MHz
            </div>
            <div className="benchmark-result">
              <span>Storage Read</span> {perf.storageRead} MB/s
            </div>
            <div className="benchmark-result">
              <span>Storage Write</span> {perf.storageWrite} MB/s
            </div>
            <div className="benchmark-result total">
              <span>Overall Score</span> {overallScore}/100
            </div>
          </div>

          {/* Footer actions */}
          <div
            className="action-row"
            style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}
          >
            <div style={{ fontSize: 12, color: "#777" }}>
              Tip: click any card to change the component.
            </div>
          </div>
        </div>

        {/* ASIDE (sticky score on the right) */}
        <aside
          className="benchmark-score-card"
          style={{
            position: "sticky",
            top: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <ScoreRing value={overallScore} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#666" }}>Overall</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{overallScore}/100</div>
            <div style={{ fontSize: 12, color: "#666" }}>
              {selectedCount}/{SLOT_MAP.length} selected · {completion}%
            </div>
          </div>
        </aside>
      </div>

      {/* Picker Modal */}
      {openPicker.open && (
        <div className="picker-overlay" onClick={onClosePicker}>
          <div className="picker-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="picker-header">
              <div className="picker-title">Select {openPicker.slot}</div>
              <button className="btn ghost" onClick={onClosePicker}>✕</button>
            </div>

            <input
              className="text-input"
              placeholder="Search by name or brand..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* Tidy, responsive grid inside the modal */}
            <div
              className="picker-list"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 10,
              }}
            >
              {itemsForSlot.length === 0 ? (
                <div className="picker-empty">
                  {components?.[SLOT_MAP.find((m) => m.id === openPicker.slot)?.key]
                    ? "No matches. Try another search."
                    : "No items found for this category. Add some to components."}
                </div>
              ) : (
                itemsForSlot.map((item) => (
                  <button
                    key={item.name + item.brand}
                    className="picker-item"
                    onClick={() => handlePick(openPicker.slot, item)}
                    title={item.name}
                    aria-label={`Pick ${item.name}`}
                    style={{ flexDirection: "column", alignItems: "stretch" }}
                  >
                    <div style={{ position: "relative" }}>
                      {item.img ? (
                        <img className="picker-img" src={item.img} alt={item.name} loading="lazy" />
                      ) : (
                        <div className="picker-img placeholder">{item.brand?.[0] || "•"}</div>
                      )}
                      {item.link && (
                        <a
                          className="picker-link"
                          href={item.link}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open product page"
                          style={{ position: "absolute", right: 8, bottom: 8 }}
                        >
                          ↗
                        </a>
                      )}
                    </div>
                    <div className="picker-meta" style={{ paddingTop: 6 }}>
                      <div className="picker-name">{item.name}</div>
                      <div className="picker-brand">{item.brand}</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenchmarkPage;