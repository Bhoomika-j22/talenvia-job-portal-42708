import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import Toast from "../components/Toast";
import { ErrorCard, LoadingCard } from "../components/Status";

// PUBLIC_INTERFACE
export default function Profile() {
  /** Profile page with skills management using placeholder API client. */
  const [state, setState] = useState({ status: "loading" });
  const [newSkill, setNewSkill] = useState("");
  const [toast, setToast] = useState(null);

  const skills = useMemo(() => (state.data?.skills || []), [state.data]);

  const load = () => {
    setState({ status: "loading" });
    api.getProfile()
      .then((data) => setState({ status: "ok", data }))
      .catch((error) => setState({ status: "error", error }));
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    const skill = newSkill.trim();
    if (!skill) return;

    try {
      await api.addSkill(skill);
      setState((prev) => {
        if (prev.status !== "ok") return prev;
        const updated = Array.from(new Set([...(prev.data.skills || []), skill]));
        return { ...prev, data: { ...prev.data, skills: updated } };
      });
      setNewSkill("");
      setToast({ title: "Skill added", message: `Added “${skill}” to your profile.` });
    } catch (e) {
      setToast({ title: "Could not add skill", message: e?.message || "Unknown error" });
    }
  };

  const remove = async (skill) => {
    try {
      await api.removeSkill(skill);
      setState((prev) => {
        if (prev.status !== "ok") return prev;
        return { ...prev, data: { ...prev.data, skills: (prev.data.skills || []).filter((s) => s !== skill) } };
      });
      setToast({ title: "Skill removed", message: `Removed “${skill}”.` });
    } catch (e) {
      setToast({ title: "Could not remove skill", message: e?.message || "Unknown error" });
    }
  };

  if (state.status === "loading") return <LoadingCard title="Loading your profile…" />;
  if (state.status === "error") return <ErrorCard title="Failed to load profile" error={state.error} onRetry={load} />;

  const p = state.data;

  return (
    <>
      <div className="card">
        <div className="cardHeaderRow">
          <div>
            <h1 className="h1">Profile & Skills</h1>
            <p className="muted" style={{ margin: "6px 0 0 0" }}>
              Keep your profile fresh — Talenvia uses skills to power matching and recommendations.
            </p>
          </div>
          <span className="pill">✨ Skills Ready</span>
        </div>

        <div className="grid2">
          <div className="card" style={{ padding: 14 }}>
            <h2 className="h2">Profile</h2>
            <div className="muted" style={{ marginTop: 8, fontSize: 13 }}>
              <div><strong>Name:</strong> {p.name}</div>
              <div><strong>Title:</strong> {p.title}</div>
              <div><strong>Location:</strong> {p.location}</div>
              <div><strong>Level:</strong> {p.experienceLevel}</div>
            </div>
            <p style={{ marginBottom: 0, marginTop: 10 }}>{p.bio}</p>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <h2 className="h2">Add a skill</h2>
            <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
              Try “Accessibility”, “GraphQL”, or “Performance”.
            </div>
            <div className="inputRow" style={{ marginTop: 10 }}>
              <input
                className="input"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill…"
                aria-label="New skill name"
              />
              <button className="btn" onClick={add} type="button">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="cardHeaderRow">
          <h2 className="h2">Your skills</h2>
          <span className="badge badgeInfo">{skills.length} total</span>
        </div>

        {skills.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            No skills yet — add a few above to unlock better matches.
          </p>
        ) : (
          <div className="inputRow">
            {skills.map((s) => (
              <span key={s} className="pill pillSecondary">
                {s}
                <button
                  className="btn btnGhost"
                  type="button"
                  onClick={() => remove(s)}
                  aria-label={`Remove skill ${s}`}
                  style={{ padding: "6px 10px" }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <Toast
        title={toast?.title}
        message={toast?.message}
        onClose={() => setToast(null)}
      />
    </>
  );
}
