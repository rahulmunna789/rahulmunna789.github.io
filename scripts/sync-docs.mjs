import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(".");
const dist = resolve(root, "dist");
const docs = resolve(root, "docs");

await rm(docs, { recursive: true, force: true });
await mkdir(docs, { recursive: true });
await cp(dist, docs, { recursive: true });
await writeFile(resolve(docs, ".nojekyll"), "");

console.log("Copied dist/ to docs/ for GitHub Pages branch deployment.");
