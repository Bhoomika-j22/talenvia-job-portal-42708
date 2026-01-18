import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AppLayout from "./components/AppLayout";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MockTests from "./pages/MockTests";
import Notifications from "./pages/Notifications";
import Applications from "./pages/Applications";
import Settings from "./pages/Settings";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

// PUBLIC_INTERFACE
function App() {
  /** Root Talenvia application component defining routes and layout. */
  return (
    <div className="App">
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mock-tests" element={<MockTests />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* Legacy / convenience */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </div>
  );
}

export default App;
