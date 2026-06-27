// ─────────────────────────────────────────────────────────────
// EmailJS Configuration — reads from environment variables.
//
// SETUP:
//   1. Copy .env.example to .env
//   2. Sign up free at https://emailjs.com
//   3. Email Services → Add New Service (Gmail) → SERVICE_ID
//   4. Email Templates → Create Template → TEMPLATE_ID
//      Template variables used by the form:
//        {{from_name}}   – sender's name
//        {{from_email}}  – sender's email
//        {{message}}     – message body
//   5. Account → API Keys → PUBLIC_KEY
//   6. Fill the three VITE_EMAILJS_* values into .env
//
// Vite only exposes env vars prefixed with VITE_ to client code.
// ─────────────────────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  SERVICE_ID:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || "",
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  PUBLIC_KEY:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "",
};

// True only when all three values are present — lets the form
// fail fast and visibly instead of silently hitting the EmailJS API
// with empty strings.
export const isEmailjsConfigured = Boolean(
  EMAILJS_CONFIG.SERVICE_ID && EMAILJS_CONFIG.TEMPLATE_ID && EMAILJS_CONFIG.PUBLIC_KEY
);