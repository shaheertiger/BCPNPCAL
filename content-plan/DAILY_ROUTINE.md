# Daily blog routine

A scheduled Claude Code session runs this routine once a day. Each run publishes
**10 new articles**:

- **8 keyword articles**, each targeting a cluster from `pnp-keywords-2026-11-11.csv`
- **2 news articles** on the latest Canadian immigration news

The run then merges everything to `main` in a single pull request. Vercel deploys `main`.

Follow every step. A shorter run that publishes fewer articles which are all
accurate is better than ten articles with errors. Never publish a fact you
couldn't verify.

---

## Files in this folder

| File | Purpose |
|---|---|
| `pnp-keywords-2026-11-11.csv` | Semrush keyword export: Keyword, Intent, Relevance, Volume, Keyword Difficulty, CPC, SERP Features. Read-only. |
| `published-log.csv` | One row per article published by this routine: `date,type,slug,primary_keyword,covered_keywords`. `type` is `keyword` or `news`. `covered_keywords` is a `|`-separated list. Append to it every run. |
| `DAILY_ROUTINE.md` | This file. |

## 1. Set up

1. `git fetch origin main`, then create a branch `claude/daily-blog-YYYY-MM-DD` from `origin/main`
   (use today's date in America/Vancouver).
2. If a branch or open PR for today already exists, the routine already ran today. Stop and report that.
3. Run `npm ci` if `node_modules` is missing.

## 2. Pick 8 keyword clusters

1. Load the CSV. Drop every keyword that already appears in `primary_keyword` or
   `covered_keywords` in `published-log.csv`.
2. Drop off-topic keywords: electronics terms such as "pnp transistor", "npn", "capteur",
   "sensor" and "circuit", unrelated meanings of "PNP", and non-English keywords unless the site has a page in that language.
3. Rank what's left by `Volume` (highest first). Use lower `Keyword Difficulty` as the tiebreaker.
4. Walk down the list. For each candidate:
   - Group it with near-duplicate variants (plural/singular, word order, "pnp" vs
     "provincial nominee program", province abbreviations such as "ns pnp" and "nova scotia pnp").
     The whole group is one cluster and one article.
   - **Check for an existing article.** Search `src/pages/articles/`, `articles_meta.json` and
     `src/pages/guides.astro` for a page that already targets this intent. If one does, don't write
     a competing article. Log the cluster with `type` = `existing` and the existing slug, then move on.
     Optionally strengthen that article if it is thin, but that doesn't count toward the 8.
   - Navigational keywords for a government login or portal (e.g. "bc pnp login") don't get a full
     article unless a genuinely useful how-to angle exists (for example, how to use the portal and fix
     common errors). Skip and log them otherwise.
5. Stop at 8 new clusters.

## 3. Pick 2 news stories

1. Search for Canadian immigration news from the **last 72 hours**. Prefer primary sources: IRCC
   newsroom (canada.ca), Express Entry rounds, the BC PNP site (welcomebc.ca), other provincial
   nominee programs, the Canada Gazette and official statements. Reputable outlets (CBC, CIC News,
   Globe and Mail) can supply context, but confirm every fact against the primary source.
2. Choose the two stories that matter most to this site's readers. Priority order: BC PNP, then
   Express Entry, then federal policy affecting work permit or PR applicants, then other provinces.
3. Skip any story already covered. Check `type=news` rows in the log and the newest entries in `src/pages/news/index.astro`.
4. If nothing new and significant has happened, write a "what this week's draws and policy changes mean"
   roundup grounded in verified data rather than inventing news.

## 4. Write each article

Copy the structure of a recent article such as `src/pages/articles/how-to-move-to-vancouver-bc.astro`:

- File: `src/pages/articles/<slug>.astro`. Slug: lowercase, hyphenated, keyword-led, with no trailing slash.
- `ArticleLayout` props: `slug`, `title`, `description` (150–160 characters), `canonical`
  (`https://bcpnpcalculator.ca/articles/<slug>`), `datePublished` and `dateModified` (today),
  `articleSection` (`Guide`, `News`, `Analysis`…), `keywords` (the cluster).
- Header badge, H1, intro paragraph, `<time>`, and an estimated read time.
- A **"Quick answer"** box that answers the main query in 2–4 sentences.
- Body of 1,200–2,000 words for keyword articles, 700–1,200 words for news, with descriptive H2/H3s.
  Use tables where they help (fees, points, streams, timelines).
- A `faqs` array plus FAQPage JSON-LD, with 4–8 questions drawn from the cluster's "people also ask" style queries.
- **Sources**: link the official pages every number comes from, and state the "as of" date for figures that change (fees, draw scores, processing times, proof of funds).
- Internal links: the BC PNP calculator (`/bc-pnp-calculator`), the draws page (`/bc-pnp-draws`) where relevant, and 2–4 related existing articles.
- Tone: plain, practical, written for applicants. No hype, no guarantees of outcomes, and no legal advice beyond general information.
- Every article must be unique. Don't reuse paragraphs across articles.

Accuracy rules:
- Verify every program rule, fee, score, date and statistic during this run with web search or fetch.
  Don't rely on memory.
- If a fact can't be confirmed, leave it out or label it clearly as unconfirmed.
- News articles must state the date of the announcement and link to it.

Parallelism: writing 10 researched articles is a lot. Use subagents (one per article or per pair),
give each one this file plus its assigned cluster or story, and review their output before committing.

## 5. Register the new pages

For each new article:
1. `src/pages/guides.astro`: add a card in the most fitting section (same markup as the existing cards).
2. `src/pages/news/index.astro`: add an entry at the **top** of `newsItems` (date, category,
   categoryColor, title, summary, link). News articles must go here; keyword articles should go here too.
3. `src/data/llms-full-intro.md` and `public/llms.txt`: add a one-line entry under the matching section.
4. `articles_meta.json`: append `{ filename, slug, title, keywords, description }`.
5. `content-plan/published-log.csv`: append one row per article (and one per `existing`/skipped cluster).

The sitemap is generated automatically. Don't edit it.

## 6. Check

1. `npm run build` must pass.
2. Confirm each new page exists in `dist/articles/<slug>/index.html` and has exactly one `<h1>`, a
   canonical tag, and FAQ JSON-LD.
3. Read each article once more for factual errors, broken links and duplicated text.

## 7. Merge

1. Commit (one commit per article or one for the batch, either is fine) and push the branch.
2. Open a PR to `main` titled `Daily articles YYYY-MM-DD: <n> new posts`. List each article with its
   target keyword or news source.
3. Merge the PR (merge commit) once the build has passed. If the build fails and you can't fix it,
   leave the PR open and say why in the PR description.
4. Optional, after merging: once the deploy is live, submit the new URLs to IndexNow with
   `node scripts/indexnow-submit.mjs <url> ...`.

## 8. Report

End with a short summary: the PR link, the 10 article URLs, any clusters skipped as `existing`, and any facts you couldn't verify.
