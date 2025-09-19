import React, { useState } from "react";
import "./Order&Request.css"; // ✅ Rename for clarity and consistency

function OrderRequest({ onRequest, onClose }) {
  const [method, setMethod] = useState("text");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    onRequest?.({ method, message: trimmedMessage });

    alert(`✅ Request sent via ${method.toUpperCase()}:\n"${trimmedMessage}"`);

    setMessage("");
    onClose?.(); // Close the modal
  };

  return (
    <div className="order-request-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="order-request-box">
        <h3 id="modal-title">Local Help Request</h3>

        <label htmlFor="contact-method">
          <strong>Contact Method:</strong>
        </label>
        <select
          id="contact-method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="call">Call</option>
        </select>

        <label htmlFor="message" style={{ marginTop: "12px" }}>
          <strong>Message:</strong>
        </label>
        <textarea
          id="message"
          placeholder="Describe your issue or request..."
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="order-request-actions">
          <button onClick={handleSubmit}>Send Request</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default OrderRequest;
