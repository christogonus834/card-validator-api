// API base URL configuration.
//
// Locally (localhost / 127.0.0.1) this points at the NestJS dev server.
// In production it points at the backend deployed on Render.
//
// After deploying the backend, replace the placeholder below with your
// actual Render URL, e.g. "https://card-validation-api.onrender.com".
const API_BASE_URL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://card-validation-api.onrender.com'; // <-- replace with your Render URL
