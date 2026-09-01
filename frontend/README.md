# Card Validator — Frontend

A single-page static UI for the Card Validation API. Plain HTML/CSS/JS, no build step required.

## Files

- `index.html` — the UI (card preview, input, validate button, result states)
- `config.js` — sets `API_BASE_URL`, loaded before the main script

## Running locally

Just open `index.html` in a browser, or serve it statically:

```
npx serve .
```

By default it talks to the backend at `http://localhost:3000` when the page itself is served from `localhost`/`127.0.0.1` (see `config.js`).

## Deploying to Vercel

1. Deploy the backend first (see `../backend/README.md`) and note its Render URL.
2. Update `config.js` — replace the placeholder in the production branch with your actual Render URL:
   ```js
   : 'https://your-backend.onrender.com';
   ```
3. Push to GitHub, then in Vercel: **New Project → import this repo → set Root Directory to `frontend`**. No build command or output directory is needed (it's static).
4. Once deployed, make sure the backend's `CORS_ORIGIN` env var (on Render) includes your Vercel URL.

## The bug that was here

The UI used to call a hardcoded `http://localhost:3000/card/validate`. That only works when both frontend and backend run on the same machine — once the frontend moved to Vercel, every request would fail (attempting to reach a nonexistent `localhost` in the visitor's browser). It now reads `API_BASE_URL` from `config.js`, which auto-detects local dev vs. production.
