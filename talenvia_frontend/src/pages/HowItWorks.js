import React from "react";

// PUBLIC_INTERFACE
export default function HowItWorks() {
  /** How Talenvia Works page describing core flows. */
  return (
    <div className="card">
      <div className="cardHeaderRow">
        <div>
          <h1 className="h1">How Talenvia Works</h1>
          <p className="muted" style={{ margin: "6px 0 0 0" }}>
            A simple flow: build your profile, practice, apply, and track — with gentle nudges along the way.
          </p>
        </div>
        <span className="pill">🧭 Flow</span>
      </div>

      <div className="grid3">
        <StepCard
          title="1) Set up your profile"
          body="Add your title, location, and a strong skills list so matching and recommendations feel precise."
        />
        <StepCard
          title="2) Practice with mock tests"
          body="Take quick tests to reveal gaps, then revisit and improve with actionable tips."
        />
        <StepCard
          title="3) Track applications"
          body="Log your pipeline and keep statuses updated so you always know your next move."
        />
      </div>

      <div className="card" style={{ padding: 14, marginTop: 14 }}>
        <h2 className="h2">Notifications</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          Talenvia sends reminders when your application progresses, recommends skills to add, and suggests practice
          sessions based on what you’re targeting.
        </p>
      </div>
    </div>
  );
}

function StepCard({ title, body }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ fontWeight: 900 }}>{title}</div>
      <div className="muted" style={{ marginTop: 8, fontSize: 13 }}>
        {body}
      </div>
    </div>
  );
}
