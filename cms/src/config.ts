// Central place for app-wide config values sourced from environment variables.
// Add new VITE_* vars here rather than reading import.meta.env directly elsewhere.

export const PUBLIC_SITE_URL: string =
  import.meta.env.VITE_PUBLIC_SITE_URL || "http://localhost:5173";
