/**
 * Talenvia API client (placeholder).
 *
 * Uses REACT_APP_BACKEND_URL and REACT_APP_API_BASE without hardcoding URLs.
 * All methods currently return mock data, but the request() helper is ready to
 * be wired to real endpoints.
 */

const DEFAULT_TIMEOUT_MS = 15000;

function normalizeBase(url) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function joinUrl(a, b) {
  const left = normalizeBase(a);
  const right = (b || "").startsWith("/") ? b : `/${b || ""}`;
  return `${left}${right}`;
}

// PUBLIC_INTERFACE
export function getApiConfig() {
  /** Returns resolved API configuration derived from environment variables. */
  const backend = normalizeBase(process.env.REACT_APP_BACKEND_URL || "");
  const apiBase = process.env.REACT_APP_API_BASE || "/api";

  return {
    backendUrl: backend,
    apiBase,
    baseUrl: backend ? joinUrl(backend, apiBase) : apiBase
  };
}

async function request(path, options = {}) {
  const { baseUrl } = getApiConfig();
  const url = joinUrl(baseUrl, path);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const msg = typeof payload === "string" ? payload : (payload?.message || "Request failed");
      throw new Error(`${res.status} ${res.statusText}: ${msg}`);
    }

    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

// PUBLIC_INTERFACE
export const api = {
  /** Fetch the current user's profile (mock). */
  async getProfile() {
    // Example for real backend:
    // return request("/me/profile", { method: "GET" });
    return {
      id: "user_001",
      name: "Aanya Patel",
      title: "Frontend Developer",
      location: "Remote",
      bio: "Building delightful UIs with React. Currently leveling up in system design.",
      skills: ["React", "TypeScript", "CSS", "Testing"],
      experienceLevel: "Mid"
    };
  },

  /** Update profile details (mock). */
  async updateProfile(profilePatch) {
    // return request("/me/profile", { method: "PATCH", body: JSON.stringify(profilePatch) });
    return { ok: true, updated: profilePatch };
  },

  /** Add a skill (mock). */
  async addSkill(skillName) {
    return { ok: true, skill: skillName };
  },

  /** Remove a skill (mock). */
  async removeSkill(skillName) {
    return { ok: true, removed: skillName };
  },

  /** List mock tests (mock). */
  async listMockTests() {
    return [
      { id: "mt_001", title: "React Fundamentals", questions: 20, durationMin: 25, difficulty: "Easy" },
      { id: "mt_002", title: "JavaScript Deep Dive", questions: 25, durationMin: 35, difficulty: "Medium" },
      { id: "mt_003", title: "Frontend System Design", questions: 15, durationMin: 30, difficulty: "Hard" }
    ];
  },

  /** Submit a mock test attempt (mock). */
  async submitMockTestAttempt(testId, answers) {
    return {
      ok: true,
      testId,
      score: Math.max(45, Math.min(92, 50 + Math.floor(Math.random() * 45))),
      recommendations: ["Review hooks rules", "Practice array methods", "Try another timed test"]
    };
  },

  /** List notifications (mock). */
  async listNotifications() {
    return [
      { id: "n_001", type: "application", title: "Application viewed", body: "Your application for UI Engineer was viewed.", time: "2h ago", unread: true },
      { id: "n_002", type: "skill", title: "Skill tip", body: "Add 'Accessibility' to stand out in frontend roles.", time: "1d ago", unread: false },
      { id: "n_003", type: "test", title: "Mock test ready", body: "Try 'Frontend System Design' to boost your confidence.", time: "3d ago", unread: false }
    ];
  },

  /** Mark a notification as read (mock). */
  async markNotificationRead(notificationId) {
    return { ok: true, id: notificationId };
  },

  /** List job applications (mock). */
  async listApplications() {
    return [
      { id: "app_001", company: "Sunrise Labs", role: "Frontend Engineer", status: "Applied", updatedAt: "2026-01-14" },
      { id: "app_002", company: "Nebula Cloud", role: "UI Engineer", status: "Interview", updatedAt: "2026-01-11" },
      { id: "app_003", company: "PixelMint", role: "React Developer", status: "Offer", updatedAt: "2026-01-05" }
    ];
  },

  /** Update application status (mock). */
  async updateApplicationStatus(applicationId, status) {
    return { ok: true, id: applicationId, status };
  },

  /** Get settings (mock). */
  async getSettings() {
    return {
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      privacyMode: false
    };
  },

  /** Update settings (mock). */
  async updateSettings(settingsPatch) {
    return { ok: true, updated: settingsPatch };
  },

  /** Basic health check (real request if backend configured, otherwise mock). */
  async healthcheck() {
    const backend = process.env.REACT_APP_BACKEND_URL;
    const healthPath = process.env.REACT_APP_HEALTHCHECK_PATH || "/health";
    if (!backend) {
      return { ok: true, mode: "mock", message: "REACT_APP_BACKEND_URL not set; using mock mode." };
    }
    // Allow backend health endpoint to live outside API_BASE.
    return request(healthPath, { method: "GET" });
  }
};
