# Content Audit & Consolidation Decision (2026-06)

Context: Google AdSense returned a **"Low value content"** policy notice. This
document records the editorial audit performed in response, the decisions taken,
and the rationale — so the content strategy reads as intentional rather than
mass-produced.

## 1. Summary of findings

| Area | Finding |
|------|---------|
| Article depth | All 56 articles are **2,192–4,898 words** of body text. None are thin by length. |
| Duplication | The "BC PNP vs [Province]" cluster shares a **template skeleton** but each page carries province-specific data, fee/processing figures, cost-of-living numbers, and unique applicant-profile match-ups. Not doorway/duplicate content. |
| Canonicals | `BaseLayout` falls back to `Astro.url.href`, normalized (no `www`, no trailing slash). Canonicals are **self-referential and correct**. No cross-canonical leakage. |
| Internal linking | **23 of 56 articles were orphaned** from the `/guides` hub — reachable only via sitemap/sibling links. Orphaned pages read as low-value/doorway pages to crawlers. ← primary issue |
| Localized routes | `pa` and `ar` existed **only** as `/[lang]/bc-pnp-guide` pages whose CTAs pointed at non-existent `/[lang]/bc-pnp-calculator` routes (404). Localized homepage linked to a non-existent `/[lang]/bc-pnp-calculator-faq`. ← poor UX |
| Trust signals | About page carries a named RCIC operator (Shaheer Ali Khan, CICC R816383). Contact page was thin (≈215 words, email-only, no editorial identity). |

## 2. Decisions

**No articles deleted or merged.** The "low value" signal here is structural
(orphaned pages, broken localized routes, thin trust footprint), not editorial
thinness. Deleting indexed, substantive pages immediately before a re-review
would remove genuine content value and was rejected.

### P3 — Internal linking & hub consolidation (done)
- All 56 articles are now linked from `/guides`, organized into themed sections:
  Getting Started, Eligibility & Scoring, Streams & Programs, Processing &
  Timeline, After Nomination, Comparisons & Planning, **News & Draw Updates**
  (new), **Federal Pathways & Related Programs** (new).
- Comparison cluster is presented as an intentional, labeled set rather than a
  scatter of near-duplicate URLs.

### P4 — Localized routes (done)
- `/[lang]/bc-pnp-guide` aligned to the languages that have complete content
  across home/calculator/guide (`zh`, `hi`); orphaned `pa`/`ar` page generation
  removed so no page renders with a 404-ing CTA.
- Localized homepage "view all" link repointed to an existing localized route.

### P5 — Trust & identity footprint (done)
- Contact page expanded with editorial identity (named RCIC operator + CICC
  registration), editorial-standards/corrections section, and clearer scope of
  what the site does and does not provide.

## 3. Deferred (requires owner decision)
- Whether to translate the full article library into `zh`/`hi` (currently only
  the calculator, home, and guide are localized).
- Adding `pa`/`ar` back **only** once home + calculator content exists for them.

## 4. Pre-review checklist
- [x] No orphaned articles (`56/56` linked from `/guides`).
- [x] No 404-ing internal CTAs in localized routes.
- [x] Named, verifiable RCIC operator on About + Contact.
- [ ] Confirm CICC register lookup for R816383 resolves to the named operator
      on https://college-ic.ca before requesting AdSense review.
