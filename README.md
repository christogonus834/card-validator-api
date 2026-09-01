# Card Validator

A card number validation API (NestJS + TypeScript, Luhn algorithm) with a small static UI.

## Structure

```
.
├── backend/     NestJS API — deploy to Render
└── frontend/    Static HTML/CSS/JS UI — deploy to Vercel
```

Each half has its own README with setup and deployment details:

- [`backend/README.md`](backend/README.md) — API reference, design decisions, running/testing locally, Render deployment
- [`frontend/README.md`](frontend/README.md) — running locally, Vercel deployment, notes on the localhost bug that was fixed

## Quick start (local)

```bash
# backend
cd backend
npm install
npm run start:dev   # http://localhost:3000

# frontend (separate terminal)
cd frontend
npx serve .          # open the printed URL
```

## Deployment

1. **Backend → Render**: point Render at this repo with root directory `backend` (a `render.yaml` blueprint is included). Render sets `PORT` automatically; optionally set `CORS_ORIGIN` to your Vercel URL once you have it.
2. **Frontend → Vercel**: point Vercel at this repo with root directory `frontend`. Before deploying, update the production URL in `frontend/config.js` to your Render backend's URL.
3. Redeploy the backend with `CORS_ORIGIN` set to the Vercel URL so cross-origin requests are allowed.
