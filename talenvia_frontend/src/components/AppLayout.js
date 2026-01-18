import React from "react";
import { NavLink } from "react-router-dom";

// PUBLIC_INTERFACE
export default function AppLayout({ children }) {
  /** Talenvia app shell layout: header + sidebar + main content. */
  return (
    <div className="appShell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="sidebarCard">
          <div className="sidebarBrand">
            <div className="brandRow">
              <div className="brandMark" aria-hidden="true" />
              <div>
                <div className="brandTitle">Talenvia</div>
                <div className="brandSubtitle">Candy Pop Job Quest</div>
              </div>
            </div>
          </div>

          <nav className="sidebarNav">
            <NavItem to="/" label="Dashboard" icon="🏠" />
            <NavItem to="/profile" label="Profile & Skills" icon="✨" variant="secondary" />
            <NavItem to="/mock-tests" label="Mock Tests" icon="📝" />
            <NavItem to="/notifications" label="Notifications" icon="🔔" variant="secondary" />
            <NavItem to="/applications" label="Applications" icon="📌" />
            <NavItem to="/settings" label="Settings" icon="⚙️" variant="secondary" />
            <div style={{ height: 10 }} />
            <NavItem to="/about" label="About Us" icon="🍬" />
            <NavItem to="/how-it-works" label="How It Works" icon="🧭" variant="secondary" />
          </nav>
        </div>
      </aside>

      <header className="header">
        <div className="headerInner">
          <div className="pill">
            <span aria-hidden="true">💖</span>
            <span>Find roles that match your skills — fast.</span>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
            <a className="btn btnGhost" href={process.env.REACT_APP_FRONTEND_URL || "/"} title="Frontend URL">
              Frontend
            </a>
            <a
              className="btn btnGhost"
              href={process.env.REACT_APP_BACKEND_URL || "#"}
              title="Backend URL"
              onClick={(e) => {
                if (!process.env.REACT_APP_BACKEND_URL) e.preventDefault();
              }}
            >
              Backend
            </a>
          </div>
        </div>
      </header>

      <main className="main" role="main">
        <div className="mainInner">{children}</div>
      </main>
    </div>
  );
}

function NavItem({ to, label, icon, variant }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) => `navLink ${isActive ? "navLinkActive" : ""}`}
    >
      <span className={`navIcon ${variant === "secondary" ? "navIconSecondary" : ""}`} aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
    </NavLink>
  );
}
