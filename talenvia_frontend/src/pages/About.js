import React from "react";

// PUBLIC_INTERFACE
export default function About() {
  /** About Talenvia page. */
  return (
    <div className="card">
      <div className="cardHeaderRow">
        <div>
          <h1 className="h1">About Us</h1>
          <p className="muted" style={{ margin: "6px 0 0 0" }}>
            Talenvia is a playful job-searching platform designed to make progress feel motivating.
          </p>
        </div>
        <span className="pill pillSecondary">🍬 Candy Pop</span>
      </div>

      <div className="grid2">
        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Our mission</h2>
          <p style={{ marginBottom: 0 }}>
            Help people discover roles that fit their strengths, build confidence through practice, and track applications
            with clarity.
          </p>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">What we believe</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li><strong>Skills first:</strong> clear skills unlock better matches.</li>
            <li><strong>Practice works:</strong> mock tests reduce interview anxiety.</li>
            <li><strong>Momentum matters:</strong> tracking turns chaos into next steps.</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ padding: 14 }}>
        <h2 className="h2">Built to evolve</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          This frontend includes placeholder API clients wired to <code>REACT_APP_BACKEND_URL</code> and{" "}
          <code>REACT_APP_API_BASE</code>. As backend endpoints come online, we can swap mock data for real responses
          without changing the UI structure.
        </p>
      </div>
    </div>
  );
}
