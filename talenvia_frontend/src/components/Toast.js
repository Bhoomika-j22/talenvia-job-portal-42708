import React from "react";

// PUBLIC_INTERFACE
export default function Toast({ title, message, onClose }) {
  /** Lightweight toast for inline feedback (used by pages). */
  if (!title && !message) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          {title ? <p className="toastTitle">{title}</p> : null}
          {message ? <p className="toastBody">{message}</p> : null}
        </div>
        <button className="btn btnGhost" onClick={onClose} type="button" aria-label="Close toast">
          ✕
        </button>
      </div>
    </div>
  );
}
