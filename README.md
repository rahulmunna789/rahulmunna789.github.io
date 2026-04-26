# Insurance Prototype Demo

This workspace wraps the AI-generated TSX prototype from `/Users/rahulroymunna/Downloads/insurance_prototype.tsx` in a minimal Vite + React app so it can be launched in a browser for demos.

## What the prototype does

The prototype simulates an end-to-end insurance workflow across three connected views:

- `Hospital HIS`: reviews bookings, confirms appointments, and sends pre-auth/treatment details.
- `MediCode Platform`: performs AI-assisted coding, fraud checks, and claim submission.
- `Insurer Portal`: reviews the coded claim and issues the final decision.

The top meta bar tracks the workflow from booking intake through synced claim status updates, and the app keeps that state as you switch portals.

## Demo flow

1. Start in `Hospital HIS`.
2. Confirm a booking, then open `Review & Send`.
3. Send the pre-auth to advance the status.
4. Switch to `MediCode Platform`, accept the coding suggestions, run fraud checks, then approve and send.
5. Switch to `Insurer Portal`, review the claim, and approve, reject, or query it.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## GitHub Pages

**If the live site is blank or never updates:**

1. **Wrong source** — In the repo **Settings → Pages**, set **Build and deployment** to **GitHub Actions**, not “Deploy from a branch” to `/ (root)`. The root `index.html` is only for Vite dev; it loads `/src/main.tsx`, which GitHub Pages does not compile.
2. **Stale or partial `/docs`** — If you use **Deploy from a branch** with folder **`/docs`**, that folder must contain the **full** Vite output (`index.html` plus `assets/…`). Committing only `docs/index.html` (with no matching `assets`) breaks the app because the JS bundle 404s. After UI changes, run `npm run build:docs` and commit the updated `docs/` tree (or rely on Actions only and ignore `/docs`).
3. **CI install failures** — The workflow uses `npm ci`, which requires `package-lock.json` to match `package.json`. After dependency edits, run `npm install` locally and commit the updated lockfile.

## Notes

- The design is desktop-first and works best in a laptop/desktop browser during demos.
- The prototype loads Google-hosted fonts/icons for visual fidelity.
