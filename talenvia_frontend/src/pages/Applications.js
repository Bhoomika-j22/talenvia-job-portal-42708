import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import Toast from "../components/Toast";
import { ErrorCard, LoadingCard } from "../components/Status";

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

// PUBLIC_INTERFACE
export default function Applications() {
  /** Application tracker (mock) with status update actions. */
  const [state, setState] = useState({ status: "loading" });
  const [toast, setToast] = useState(null);

  const load = () => {
    setState({ status: "loading" });
    api.listApplications()
      .then((data) => setState({ status: "ok", data }))
      .catch((error) => setState({ status: "error", error }));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.updateApplicationStatus(id, status);
      setState((prev) => {
        if (prev.status !== "ok") return prev;
        return {
          ...prev,
          data: prev.data.map((a) => (a.id === id ? { ...a, status, updatedAt: new Date().toISOString().slice(0, 10) } : a))
        };
      });
      setToast({ title: "Updated", message: `Application status changed to “${status}”.` });
    } catch (e) {
      setToast({ title: "Update failed", message: e?.message || "Unknown error" });
    }
  };

  if (state.status === "loading") return <LoadingCard title="Loading applications…" />;
  if (state.status === "error") return <ErrorCard title="Failed to load applications" error={state.error} onRetry={load} />;

  return (
    <>
      <div className="card">
        <div className="cardHeaderRow">
          <div>
            <h1 className="h1">Application Tracking</h1>
            <p className="muted" style={{ margin: "6px 0 0 0" }}>
              Track your job pipeline — update statuses so Talenvia can nudge you at the right moment.
            </p>
          </div>
          <span className="pill pillSecondary">📌 Pipeline</span>
        </div>

        <table className="table" aria-label="Applications table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Updated</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {state.data.map((a) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 900 }}>{a.company}</td>
                <td>{a.role}</td>
                <td>
                  <span className={`badge ${a.status === "Offer" ? "badgeSuccess" : a.status === "Interview" ? "badgeInfo" : a.status === "Rejected" ? "" : "badgeWarn"}`}>
                    {a.status}
                  </span>
                </td>
                <td className="muted">{a.updatedAt}</td>
                <td>
                  <select
                    className="input"
                    style={{ minWidth: 160, padding: "10px 12px" }}
                    value={a.status}
                    onChange={(e) => updateStatus(a.id, e.target.value)}
                    aria-label={`Update status for ${a.company} ${a.role}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Toast title={toast?.title} message={toast?.message} onClose={() => setToast(null)} />
    </>
  );
}
