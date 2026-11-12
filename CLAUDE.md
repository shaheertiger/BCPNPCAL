# CLAUDE.md

## Git workflow: always push and merge

The site owner has given standing permission. When you finish any change in this repo:

1. Run `npm run build` and make sure it passes.
2. Commit, then push your branch.
3. Open a pull request to `main` and **merge it** (merge commit) without asking first.

If the build fails and you can't fix it, push the branch, open the PR, explain the failure in its description and don't merge.
`main` deploys to production (Vercel, bcpnpcalculator.ca) automatically.

## Project notes

- Astro static site. Articles live in `src/pages/articles/<slug>.astro` and use `ArticleLayout`.
- New articles must also be registered in `src/pages/guides.astro`, `src/pages/news/index.astro`,
  `src/data/llms-full-intro.md`, `public/llms.txt` and `articles_meta.json`. The sitemap is automatic.
- BC PNP draw data: `src/data/bcpnp-draws.ts` (the draws page reads from it).
- Daily blog routine: `content-plan/DAILY_ROUTINE.md`.
- Security headers and CSP: `vercel.json`, mirrored in `public/_headers`.
- `astro check` has 8 existing errors in `src/pages/[lang]/` pages. They don't block `npm run build`.
