import React from "react";

// PUBLIC_INTERFACE
export function LoadingCard({ title = "Loading…" }) {
  /** Simple loading state card used across pages. */
  return (
    <div className="card" role="status" aria-live="polite">
      <div className="cardHeaderRow">
        <h1 className="h1">{title}</h1>
        <span className="pill pillSecondary">Please wait</span>
      </div>
      <p className="muted" style={{ margin: 0 }}>
        Fetching the latest Talenvia data…
      </p>
    </div>
  );
}

// PUBLIC_INTERFACE
export function ErrorCard({ title = "Something went wrong", error, onRetry }) {
  /** Simple error state card used across pages. */
  return (
    <div className="card" role="alert">
      <div className="cardHeaderRow">
        <h1 className="h1">{title}</h1>
        <span className="pill" style={{ background: "rgba(239,68,68,0.12)", borderColor: "rgba(239,68,68,0.22)" }}>
          Error
        </span>
      </div>
      <p className="muted" style={{ marginTop: 0 }}>
        {error?.message || String(error || "Unknown error")}
      </p>
      {onRetry ? (
        <button className="btn btnSecondary" onClick={onRetry} type="button">
          Retry
        </button>
      ) : null}
    </div>
  );
}
