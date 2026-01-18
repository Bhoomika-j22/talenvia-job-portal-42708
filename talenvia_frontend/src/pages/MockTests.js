import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import Toast from "../components/Toast";
import { ErrorCard, LoadingCard } from "../components/Status";

// PUBLIC_INTERFACE
export default function MockTests() {
  /** Mock test listing with simple mock submission. */
  const [state, setState] = useState({ status: "loading" });
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const load = () => {
    setState({ status: "loading" });
    api.listMockTests()
      .then((data) => setState({ status: "ok", data }))
      .catch((error) => setState({ status: "error", error }));
  };

  useEffect(() => {
    load();
  }, []);

  const start = (t) => setSelected(t);

  const submit = async () => {
    if (!selected) return;
    try {
      const result = await api.submitMockTestAttempt(selected.id, []);
      setToast({ title: "Attempt submitted", message: `Score: ${result.score}/100. Tip: ${result.recommendations?.[0] || "Keep practicing!"}` });
      setSelected(null);
    } catch (e) {
      setToast({ title: "Submission failed", message: e?.message || "Unknown error" });
    }
  };

  if (state.status === "loading") return <LoadingCard title="Loading mock tests…" />;
  if (state.status === "error") return <ErrorCard title="Failed to load mock tests" error={state.error} onRetry={load} />;

  const tests = state.data;

  return (
    <>
      <div className="card">
        <div className="cardHeaderRow">
          <div>
            <h1 className="h1">Mock Tests</h1>
            <p className="muted" style={{ margin: "6px 0 0 0" }}>
              Practice fast, learn faster — use these bite-sized tests to prep for interviews.
            </p>
          </div>
          <span className="pill pillSecondary">📝 Practice Mode</span>
        </div>

        <div className="grid3">
          {tests.map((t) => (
            <button
              key={t.id}
              type="button"
              className="card"
              onClick={() => start(t)}
              style={{ textAlign: "left", cursor: "pointer" }}
            >
              <div style={{ fontWeight: 900 }}>{t.title}</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
                {t.questions} questions • {t.durationMin} min
              </div>
              <div style={{ marginTop: 10 }}>
                <span className={`badge ${t.difficulty === "Easy" ? "badgeSuccess" : t.difficulty === "Hard" ? "badgeWarn" : "badgeInfo"}`}>
                  {t.difficulty}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected ? (
        <div className="card">
          <div className="cardHeaderRow">
            <h2 className="h2">Ready to start?</h2>
            <span className="badge badgeInfo">{selected.title}</span>
          </div>
          <p className="muted" style={{ marginTop: 0 }}>
            This is a placeholder attempt flow. When backend endpoints are added, this page will become interactive.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn" type="button" onClick={submit}>
              Submit a quick attempt
            </button>
            <button className="btn btnGhost" type="button" onClick={() => setSelected(null)}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <Toast title={toast?.title} message={toast?.message} onClose={() => setToast(null)} />
    </>
  );
}
