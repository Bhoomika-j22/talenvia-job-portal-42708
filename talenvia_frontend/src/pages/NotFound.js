import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function NotFound() {
  /** 404 fallback page. */
  return (
    <div className="card">
      <div className="cardHeaderRow">
        <div>
          <h1 className="h1">Page not found</h1>
          <p className="muted" style={{ margin: "6px 0 0 0" }}>
            That route doesn’t exist. Let’s get you back to your dashboard.
          </p>
        </div>
        <span className="pill pillSecondary">404</span>
      </div>

      <Link to="/" className="btn">
        Go to Dashboard
      </Link>
    </div>
  );
}
