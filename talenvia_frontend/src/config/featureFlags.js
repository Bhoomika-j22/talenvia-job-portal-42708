/**
 * Feature flags derived from environment variables.
 *
 * - REACT_APP_FEATURE_FLAGS: comma-separated list, e.g. "skills,mockTests,notifications"
 * - REACT_APP_EXPERIMENTS_ENABLED: "true"/"false"
 */

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Returns a Set of enabled feature flags based on env configuration. */
  const raw = (process.env.REACT_APP_FEATURE_FLAGS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  return new Set(raw);
}

// PUBLIC_INTERFACE
export function isExperimentsEnabled() {
  /** Returns true if experiments are enabled. */
  return String(process.env.REACT_APP_EXPERIMENTS_ENABLED || "").toLowerCase() === "true";
}

// PUBLIC_INTERFACE
export function hasFlag(flag) {
  /** Returns true if a flag is enabled (by exact match). */
  return getFeatureFlags().has(flag);
}
