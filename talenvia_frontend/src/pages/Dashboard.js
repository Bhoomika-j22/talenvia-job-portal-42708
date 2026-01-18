import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, getApiConfig } from "../api/client";
import { ErrorCard, LoadingCard } from "../components/Status";

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard landing: highlights features and shows API configuration/health. */
  const [health, setHealth] = useState({ status: "loading" });

  useEffect(() => {
    let mounted = true;
    api.healthcheck()
      .then((res) => {
        if (!mounted) return;
        setHealth({ status: "ok", data: res });
      })
      .catch((err) => {
        if (!mounted) return;
        setHealth({ status: "error", error: err });
      });

    return () => {
      mounted = false;
    };
  }, []);

  const cfg = getApiConfig();

  return (
    <>
      <div className="card">
        <div className="cardHeaderRow">
          <div>
            <h1 className="h1">Welcome to Talenvia</h1>
            <p className="muted" style={{ margin: "6px 0 0 0" }}>
              A playful job-search workspace: profile skills, practice mock tests, track applications, and stay notified.
            </p>
          </div>
          <span className="pill pillSecondary">Candy Pop</span>
        </div>

        <div className="grid3">
          <QuickLink title="Profile & Skills" desc="Polish your profile and manage skills." to="/profile" />
          <QuickLink title="Mock Tests" desc="Practice with timed quizzes and tips." to="/mock-tests" />
          <QuickLink title="Applications" desc="Track your pipeline and next steps." to="/applications" />
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="cardHeaderRow">
            <h2 className="h2">API wiring</h2>
            <span className="badge badgeInfo">Env-driven</span>
          </div>
          <table className="table" aria-label="API configuration table">
            <tbody>
              <tr>
                <th scope="row">REACT_APP_BACKEND_URL</th>
                <td>{process.env.REACT_APP_BACKEND_URL || <span className="muted">not set</span>}</td>
              </tr>
              <tr>
                <th scope="row">REACT_APP_API_BASE</th>
                <td>{process.env.REACT_APP_API_BASE || <span className="muted">/api (default)</span>}</td>
              </tr>
              <tr>
                <th scope="row">Resolved baseUrl</th>
                <td>{cfg.baseUrl}</td>
              </tr>
              <tr>
                <th scope="row">REACT_APP_WS_URL</th>
                <td>{process.env.REACT_APP_WS_URL || <span className="muted">not set</span>}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {health.status === "loading" ? (
          <LoadingCard title="Checking backend health…" />
        ) : health.status === "error" ? (
          <ErrorCard title="Backend health check failed" error={health.error} />
        ) : (
          <div className="card">
            <div className="cardHeaderRow">
              <h2 className="h2">Health check</h2>
              <span className="badge badgeSuccess">OK</span>
            </div>
            <p className="muted" style={{ marginTop: 0 }}>
              Backend responded successfully (or mock mode if backend isn’t configured).
            </p>
            <pre
              style={{
                margin: 0,
                padding: 12,
                borderRadius: 14,
                background: "rgba(17,24,39,0.04)",
                border: "1px solid rgba(17,24,39,0.06)",
                overflowX: "auto",
                fontSize: 12
              }}
            >
              {JSON.stringify(health.data, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="card">
        <div className="cardHeaderRow">
          <h2 className="h2">Need a tour?</h2>
          <span className="badge">Tips</span>
        </div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Start with <Link to="/profile"><strong>Profile & Skills</strong></Link> to match roles better.</li>
          <li>Use <Link to="/mock-tests"><strong>Mock Tests</strong></Link> to prep for interviews.</li>
          <li>Track everything in <Link to="/applications"><strong>Applications</strong></Link> so nothing slips.</li>
        </ul>
      </div>
    </>
  );
}

function QuickLink({ title, desc, to }) {
  return (
    <Link to={to} className="card" style={{ padding: 14, display: "block" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 900 }}>{title}</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
            {desc}
          </div>
        </div>
        <span className="badge badgeInfo" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
