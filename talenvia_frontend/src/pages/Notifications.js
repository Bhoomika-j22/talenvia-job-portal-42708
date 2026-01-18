import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import Toast from "../components/Toast";
import { ErrorCard, LoadingCard } from "../components/Status";

// PUBLIC_INTERFACE
export default function Notifications() {
  /** Notifications center (mock) with read/unread handling. */
  const [state, setState] = useState({ status: "loading" });
  const [toast, setToast] = useState(null);

  const load = () => {
    setState({ status: "loading" });
    api.listNotifications()
      .then((data) => setState({ status: "ok", data }))
      .catch((error) => setState({ status: "error", error }));
  };

  useEffect(() => {
    load();
  }, []);

  const unreadCount = useMemo(() => {
    if (state.status !== "ok") return 0;
    return (state.data || []).filter((n) => n.unread).length;
  }, [state]);

  const markRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setState((prev) => {
        if (prev.status !== "ok") return prev;
        return { ...prev, data: prev.data.map((n) => (n.id === id ? { ...n, unread: false } : n)) };
      });
    } catch (e) {
      setToast({ title: "Could not update notification", message: e?.message || "Unknown error" });
    }
  };

  if (state.status === "loading") return <LoadingCard title="Loading notifications…" />;
  if (state.status === "error") return <ErrorCard title="Failed to load notifications" error={state.error} onRetry={load} />;

  return (
    <>
      <div className="card">
        <div className="cardHeaderRow">
          <div>
            <h1 className="h1">Notifications</h1>
            <p className="muted" style={{ margin: "6px 0 0 0" }}>
              Updates about your applications, skills, and practice sessions.
            </p>
          </div>
          <span className="pill">{unreadCount} unread</span>
        </div>

        <table className="table" aria-label="Notifications table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Message</th>
              <th>Time</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {state.data.map((n) => (
              <tr key={n.id}>
                <td>
                  <span className={`badge ${n.type === "application" ? "badgeInfo" : n.type === "test" ? "badgeWarn" : "badgeSuccess"}`}>
                    {n.type}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: n.unread ? 900 : 700 }}>{n.title}</div>
                  <div className="muted" style={{ fontSize: 13 }}>{n.body}</div>
                </td>
                <td className="muted">{n.time}</td>
                <td>
                  {n.unread ? (
                    <button className="btn btnGhost" type="button" onClick={() => markRead(n.id)}>
                      Mark read
                    </button>
                  ) : (
                    <span className="muted" style={{ fontSize: 13 }}>Read</span>
                  )}
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
