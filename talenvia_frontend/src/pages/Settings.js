import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import Toast from "../components/Toast";
import { ErrorCard, LoadingCard } from "../components/Status";

// PUBLIC_INTERFACE
export default function Settings() {
  /** User settings page (mock). */
  const [state, setState] = useState({ status: "loading" });
  const [toast, setToast] = useState(null);

  const load = () => {
    setState({ status: "loading" });
    api.getSettings()
      .then((data) => setState({ status: "ok", data }))
      .catch((error) => setState({ status: "error", error }));
  };

  useEffect(() => {
    load();
  }, []);

  const updateLocal = (key, value) => {
    setState((prev) => (prev.status === "ok" ? { ...prev, data: { ...prev.data, [key]: value } } : prev));
  };

  const save = async () => {
    if (state.status !== "ok") return;
    try {
      await api.updateSettings(state.data);
      setToast({ title: "Saved", message: "Your settings were updated." });
    } catch (e) {
      setToast({ title: "Save failed", message: e?.message || "Unknown error" });
    }
  };

  if (state.status === "loading") return <LoadingCard title="Loading settings…" />;
  if (state.status === "error") return <ErrorCard title="Failed to load settings" error={state.error} onRetry={load} />;

  const s = state.data;

  return (
    <>
      <div className="card">
        <div className="cardHeaderRow">
          <div>
            <h1 className="h1">Settings</h1>
            <p className="muted" style={{ margin: "6px 0 0 0" }}>
              Tune notifications and privacy — keep Talenvia helpful, not noisy.
            </p>
          </div>
          <span className="pill">⚙️ Personal</span>
        </div>

        <div className="grid2">
          <SettingToggle
            label="Email notifications"
            desc="Receive key updates about applications and reminders."
            value={s.emailNotifications}
            onChange={(v) => updateLocal("emailNotifications", v)}
          />
          <SettingToggle
            label="Push notifications"
            desc="Show quick alerts in supported browsers/devices."
            value={s.pushNotifications}
            onChange={(v) => updateLocal("pushNotifications", v)}
          />
          <SettingToggle
            label="Weekly digest"
            desc="A weekly summary of progress and next suggestions."
            value={s.weeklyDigest}
            onChange={(v) => updateLocal("weeklyDigest", v)}
          />
          <SettingToggle
            label="Privacy mode"
            desc="Hide personal details in shared or public spaces."
            value={s.privacyMode}
            onChange={(v) => updateLocal("privacyMode", v)}
          />
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn" type="button" onClick={save}>
            Save settings
          </button>
          <button className="btn btnGhost" type="button" onClick={load}>
            Reset
          </button>
        </div>
      </div>

      <div className="card">
        <div className="cardHeaderRow">
          <h2 className="h2">Environment</h2>
          <span className="badge badgeInfo">{process.env.REACT_APP_NODE_ENV || "unknown"}</span>
        </div>
        <p className="muted" style={{ marginTop: 0 }}>
          Talenvia respects the provided environment variables and feature flags.
        </p>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li><span className="muted">LOG LEVEL:</span> <strong>{process.env.REACT_APP_LOG_LEVEL || "default"}</strong></li>
          <li><span className="muted">TRUST PROXY:</span> <strong>{process.env.REACT_APP_TRUST_PROXY || "default"}</strong></li>
          <li><span className="muted">PORT:</span> <strong>{process.env.REACT_APP_PORT || "3000"}</strong></li>
        </ul>
      </div>

      <Toast title={toast?.title} message={toast?.message} onClose={() => setToast(null)} />
    </>
  );
}

function SettingToggle({ label, desc, value, onChange }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="cardHeaderRow" style={{ marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 900 }}>{label}</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
            {desc}
          </div>
        </div>
        <span className={`badge ${value ? "badgeSuccess" : ""}`}>{value ? "On" : "Off"}</span>
      </div>

      <button
        className={`btn ${value ? "" : "btnSecondary"}`}
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
      >
        {value ? "Turn off" : "Turn on"}
      </button>
    </div>
  );
}
