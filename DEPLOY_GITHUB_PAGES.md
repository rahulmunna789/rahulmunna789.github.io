# GitHub Pages Deployment

This project is already prepared for GitHub Pages:

- `vite.config.ts` uses `base: "./"` so built assets resolve correctly.
- `.github/workflows/deploy.yml` builds and deploys the `dist/` folder automatically.

## What to upload

Upload the full project folder contents to your GitHub repository root:

- `.github/`
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

## Local test before upload

```bash
npm install
npm run build
```

## If you prefer drag-and-drop without Actions

1. Run `npm install`
2. Run `npm run build`
3. Upload only the contents of `dist/` to a static host

For GitHub Pages specifically, the GitHub Actions workflow above is the cleaner option.
