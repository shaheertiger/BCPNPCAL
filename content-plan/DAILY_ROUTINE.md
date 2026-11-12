# Daily blog routine

A scheduled Claude Code session runs this routine once a day. Each run publishes
**5 new articles**:

- **4 keyword articles**, each targeting a cluster from the keyword exports in this folder (`*keywords*.csv`)
- **1 news article** on the latest Canadian immigration news

The run then merges everything to `main` in a single pull request. Vercel deploys `main`.

Follow every step. A shorter run that publishes fewer articles which are all
accurate is better than five articles with errors. Never publish a fact you
couldn't verify.

---

## Files in this folder

| File | Purpose |
|---|---|
| `pnp-keywords-2026-11-11.csv` | Semrush keyword export (PNP terms): Keyword, Intent, Relevance, Volume, Keyword Difficulty, CPC, SERP Features. Read-only. |
| `immigration-keywords-ca-2026-11-12.csv` | Semrush keyword export (general Canadian immigration terms, Canada database), same columns. Read-only. |
| `express-entry-keywords-ca-2026-11-12.csv` | Semrush keyword export (Express Entry and related terms, Canada database), same columns. Read-only. Noisy: apply the off-topic rules strictly. |
| `published-log.csv` | One row per article published by this routine: `date,type,slug,primary_keyword,covered_keywords`. `type` is `keyword` or `news`. `covered_keywords` is a `|`-separated list. Append to it every run. |
| `DAILY_ROUTINE.md` | This file. |
| `images/_template.html` | Starting point for each article's hero image design. |
| `images/<slug>.html` | Design source for each published article's hero image (rendered by `scripts/render-article-image.cjs`). |

## 1. Set up

0. Check GitHub access first: `git push --dry-run origin HEAD` must succeed. If it is refused, stop and report it; don't write articles you can't publish.
1. `git fetch origin main`, then create a branch `claude/daily-blog-YYYY-MM-DD` from `origin/main`
   (use today's date in America/Vancouver).
2. If a branch or open PR for today already exists, the routine already ran today. Stop and report that.
3. Run `npm ci` if `node_modules` is missing.

## 2. Pick 4 keyword clusters

1. Load every `*keywords*.csv` export in this folder and merge them into one list (if the same keyword appears in more than one file, keep the row with the highest `Volume`). Drop every keyword that already appears in `primary_keyword` or
   `covered_keywords` in `published-log.csv`.
2. Drop off-topic keywords: electronics terms such as "pnp transistor", "npn", "capteur",
   "sensor" and "circuit", unrelated meanings of "PNP", and non-English keywords unless the site has a page in that language.
   Also drop keywords that aren't about Canadian immigration (US or other countries' immigration such as "ice usa",
   "ice homeland" and US deportation news), bare brand or government-name queries with no answerable question
   (e.g. "cic", "goverment"), phone-number and customer-service lookups, and keywords that are the headline of an old
   news story (e.g. "ircc held two express entry draws issuing thousands of invitations"); fold those into a news or
   tracker cluster instead of writing them up as their own article. Prefer topics that matter to people heading for
   B.C. or Canadian PR; the site's focus is BC PNP and the routes around it.
   Drop as well: non-immigration Canadian government services (CRA, EI reporting, Service Canada benefits, provincial
   maintenance enforcement such as "fmep" or "mep login", Quebec's clicSÉQUR), other countries' travel authorizations and
   consulates (e.g. "esta", "eta uk", "us consulate toronto", "oci"), and keywords in non-Latin scripts. Login and portal
   keywords for IRCC itself (e.g. "cic login", "ircc portal") follow the navigational rule in step 4.
3. Rank what's left by `Volume` (highest first). Use lower `Keyword Difficulty` as the tiebreaker.
4. Walk down the list. For each candidate:
   - Group it with near-duplicate variants (plural/singular, word order, "pnp" vs
     "provincial nominee program", province abbreviations such as "ns pnp" and "nova scotia pnp").
     The whole group is one cluster and one article.
   - **Check for an existing article.** Search `src/pages/articles/`, `articles_meta.json` and
     `src/pages/guides.astro` for a page that already targets this intent. If one does, don't write
     a competing article. Log the cluster with `type` = `existing` and the existing slug, then move on.
     Optionally strengthen that article if it is thin, but that doesn't count toward the 4.
   - Navigational keywords for a government login or portal (e.g. "bc pnp login") don't get a full
     article unless a genuinely useful how-to angle exists (for example, how to use the portal and fix
     common errors). Skip and log them otherwise.
5. Stop at 4 new clusters.

## 3. Pick 1 news story

1. Search for Canadian immigration news from the **last 72 hours**. Prefer primary sources: IRCC
   newsroom (canada.ca), Express Entry rounds, the BC PNP site (welcomebc.ca), other provincial
   nominee programs, the Canada Gazette and official statements. Reputable outlets (CBC, CIC News,
   Globe and Mail) can supply context, but confirm every fact against the primary source.
2. Choose the one story that matters most to this site's readers. Priority order: BC PNP, then
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
- **Minimum length: 1,000 words of body text for every article, news included.** Aim for 1,200–2,000
  words for keyword articles and 1,000–1,400 for news. Use descriptive H2/H3s, and tables where they help
  (fees, points, streams, timelines). Padding doesn't count: every section must add facts or practical steps.
- **One hero image per article**, designed for that post (see "Hero image" below).
- A `faqs` array plus FAQPage JSON-LD, with 4–8 questions drawn from the cluster's "people also ask" style queries.
- **Sources**: link the official pages every number comes from, and state the "as of" date for figures that change (fees, draw scores, processing times, proof of funds).
- Internal links: the BC PNP calculator (`/bc-pnp-calculator`), the draws page (`/bc-pnp-draws`) where relevant, and 2–4 related existing articles.
- Tone: plain, practical, written for applicants. No hype, no guarantees of outcomes, and no legal advice beyond general information.
- Every article must be unique. Don't reuse paragraphs across articles.

### Hero image (one per article)

Each article gets one custom 1200×630 image. It is designed as HTML/CSS/SVG, rendered to PNG, and used both
in the article and as the social preview image.

1. Copy `content-plan/images/_template.html` to `content-plan/images/<slug>.html` and design it for the post.
   Think like a front-end designer: a clear focal point, strong hierarchy, generous spacing, and the brand
   palette (dark slate with one accent colour). Draw an illustration specific to the topic in inline SVG,
   for example a chart of real draw cutoffs, a fee breakdown, a step timeline, a map of B.C. regions, or
   document and passport icons. Rotate the accent colour and layout between posts so the feed doesn't look
   repetitive. Every number on the image must appear in the article and be verified.
   No stock photos, no AI-generated photos, no logos of government bodies, and no text under 22px.
2. Render it: `node scripts/render-article-image.cjs content-plan/images/<slug>.html`. This writes
   `public/images/articles/<slug>.png`. Open the PNG and look at it. Fix overflowing or clipped text,
   low contrast and cramped spacing, then re-render. Keep the file under 400 KB.
3. Wire it into the article:
   - Add `ogImage="/images/articles/<slug>.png"` to the `<ArticleLayout ...>` props.
   - Directly after the closing `</header>`, add:
     ```html
     <figure class="mb-10">
       <img src="/images/articles/<slug>.png" width="1200" height="630" alt="<one-sentence description of what the image shows>"
            class="w-full h-auto rounded-2xl border border-slate-200 shadow-sm" loading="eager" fetchpriority="high" decoding="async" />
     </figure>
     ```
4. Commit both the `.html` design source and the `.png`.

Accuracy rules:
- Verify every program rule, fee, score, date and statistic during this run with web search or fetch.
  Don't rely on memory.
- If a fact can't be confirmed, leave it out or label it clearly as unconfirmed.
- News articles must state the date of the announcement and link to it.

Parallelism: writing 5 researched articles takes a while. Use subagents (one per article or per pair),
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
   canonical tag, FAQ JSON-LD, an `og:image` pointing at `/images/articles/<slug>.png`, and the hero `<img>`.
3. Check the word count of each article's body text (strip tags from the `<article>` element). Any article
   under 1,000 words must be expanded with substantive, verified content before merging.
4. Read each article once more for factual errors, broken links and duplicated text.

## 7. Merge

1. Commit (one commit per article or one for the batch, either is fine) and push the branch.
2. Open a PR to `main` titled `Daily articles YYYY-MM-DD: <n> new posts`. List each article with its
   target keyword or news source.
3. Merge the PR (merge commit) once the build has passed. If the build fails and you can't fix it,
   leave the PR open and say why in the PR description.
4. Optional, after merging: once the deploy is live, submit the new URLs to IndexNow with
   `node scripts/indexnow-submit.mjs <url> ...`.

## 8. Report

End with a short summary: the PR link, the 5 article URLs, any clusters skipped as `existing`, and any facts you couldn't verify.
