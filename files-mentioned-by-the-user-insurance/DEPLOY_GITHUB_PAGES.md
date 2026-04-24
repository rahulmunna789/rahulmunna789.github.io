# GitHub Pages Deployment

This project is already prepared for GitHub Pages:

- `vite.config.ts` uses `base: "./"` so built assets resolve correctly.
- `.github/workflows/deploy.yml` builds and deploys the `dist/` folder automatically.
- `npm run build:docs` creates a `docs/` folder if you prefer branch-based Pages deployment.

## Why your current site is blank

Your current published site is serving the raw source app instead of the built Vite output.

The live page is loading:

```html
<script type="module" src="/src/main.tsx"></script>
```

That works only in local Vite development. GitHub Pages must serve the built static output from `dist/` or `docs/`.

## What to upload

Upload the full project folder contents to your GitHub repository root:

- `.github/`
- `scripts/`
- `src/`
- `index.html`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vite.config.ts`
- `README.md`
- `DEPLOY_GITHUB_PAGES.md`

Do not upload `node_modules/` or `dist/`.

## Steps

1. Create a new GitHub repository.
2. Upload all project files from this folder into the repository root.
3. Commit and push to the `main` branch.
4. In GitHub, open `Settings` → `Pages`.
5. Under `Build and deployment`, choose `GitHub Actions`.
6. Wait for the `Deploy to GitHub Pages` workflow to finish.
7. Open the Pages URL shown in the workflow or Pages settings.

This is the recommended fix for your current blank page.

## Local test before upload

```bash
npm install
npm run build
```

## Branch-based alternative using `docs/`

1. Run `npm install`
2. Run `npm run build:docs`
3. Commit and push the generated `docs/` folder
4. In GitHub `Settings` → `Pages`, choose `Deploy from a branch`
5. Select branch `main` and folder `/docs`

This also fixes the blank page because Pages will serve built static files instead of the source app.

For GitHub Pages, the GitHub Actions workflow above is still the cleaner option.
