# SEO structure pass, November 2026

What changed, why, and how to measure it. Companion files:

- [`docs/query-map.md`](query-map.md): query → owner page map and the overlap fixes
- [`docs/link-report-2026-11.md`](link-report-2026-11.md): content links and click depth for all 125 pages
- [`docs/indexnow-2026-11.txt`](indexnow-2026-11.txt): the changed URLs to submit to IndexNow after deploy

Facts and numbers on the changed pages come from three sources, each linked on the page:

- point values: Part 8 of the **BC PNP Skills Immigration Program Guide**, effective June 10, 2026 ([PDF](https://www.welcomebc.ca/immigrate-to-b-c/bc-pnp-si-program-guide-pdf))
- draw results: **WelcomeBC Invitations to apply**, page last updated November 17, 2026 ([link](https://www.welcomebc.ca/immigrate-to-b-c/about-the-bc-provincial-nominee-program/invitations-to-apply))
- streams, fees and process: **WelcomeBC Skills Immigration** ([link](https://www.welcomebc.ca/immigrate-to-b-c/skills-immigration))

Scores in titles, meta descriptions, anchors and examples are computed at build time from `src/data/bcpnp-draws.ts` and `src/utils/calculatePoints.ts`. Adding the next draw to the data file updates every "latest minimum" on the site.

## Before and after: title, meta, H1, first sentence

Taken from the built HTML of `main` (before) and this branch (after) with `scripts/seo/page-snapshot.mjs`. Search Console figures are the last 3 months (export of 2026-11-26).

### `/`

Search Console: 25,184 impr · 4071 clicks · 16.17% CTR · #4.58 (+ www: 9 impr, #1.11)

| | Before | After |
|---|---|---|
| Title | BC PNP Calculator 2026 | BC PNP Calculator 2026: SIRS Points Score (Free, Official Factors) |
| Meta description | Free BC PNP points calculator to estimate your Skills Immigration Ranking System score. Calculate your BC Provincial Nominee Program eligibility instantly with our comprehensive tool. | Get your SIRS score in 2 minutes and compare it with the latest draw minimum (72 for Health on November 13, 2026). |
| H1 | Calculate Your BC PNP Score | BC PNP Points Calculator 2026 |
| First sentence | Estimate your British Columbia Provincial Nominee Program points instantly with our comprehensive BC PNP calculator tool. | Your SIRS score out of 200 in 2 minutes, based on WelcomeBC's 2026 factors. |
| Title length | 22 | 66 |
| Meta length | 183 | 114 |

### `/bc-pnp-draws`

Search Console: 6,491 impr · 90 clicks · 1.39% CTR · #10.11 (+ www: 91 impr, #22.95)

| | Before | After |
|---|---|---|
| Title | Latest BC PNP Draws 2026: Cut-off Scores, Invitations & Next Draw | BC PNP Draws 2026: Latest Draw Nov 13, Minimum Score 72 |
| Meta description | Every 2026 BC PNP draw: Care, Build and High Economic Impact cut-offs, invitations, the current pool, and when the next BC PNP draw is likely to happen. | November 13, 2026: Health 72, Construction 94, Childcare (ECE) 95, Veterinary 100; 384+ invitations. Every 2026 round and the score each stream needs. |
| H1 | Latest BC PNP Draws 2026 | BC PNP Draws 2026 |
| First sentence | Every 2026 Skills Immigration and Entrepreneur draw, with cut-off scores, invitation counts and what to expect next. | The latest BC PNP draw was on November 13, 2026 , a Care and Build Skills Immigration round: minimum scores were 72 for Health, 94 for Construction, 95 for Childcare (ECE) and 100 for Veterinary, with 384+ invitations (WelcomeBC reports some counts only as fewer than 5). |
| Title length | 65 | 55 |
| Meta length | 152 | 150 |

### `/bc-pnp-calculator`

Search Console: 3 impr · 0 clicks · 0% CTR · #1.33 (+ www: 243 impr, #5.07)

| | Before | After |
|---|---|---|
| Title | Free BC PNP Points Calculator \| Check Your SIRS Score 2026 | BC PNP Draw Calculator 2026: Would Your Score Get Invited? |
| Meta description | BC PNP Calculator to assess your points for permanent residence under the BC PNP Skills Immigration Stream. Contact us for guidance today! | Enter your SIRS score to see which of 37 BC PNP draws in 2026 it would have cleared. Latest: Health 72, Childcare 95, High Economic Impact 131. |
| H1 | Free BC PNP Points Calculator 2026 | BC PNP Draw Calculator 2026 |
| First sentence | Estimate your Skills Immigration Ranking System (SIRS) score instantly — 100% free, anonymous, and updated for 2026. | Enter your SIRS score and stream to see which of the 37 scored BC PNP draws in 2026 it would have cleared. |
| Title length | 58 | 58 |
| Meta length | 138 | 143 |

### `/articles/bc-pnp-work-experience-requirements-2026`

Search Console: 3,440 impr · 70 clicks · 2.03% CTR · #6.2 (+ www: 1 impr, #1.0)

| | Before | After |
|---|---|---|
| Title | BC PNP Work Experience Requirements 2026: Complete Documentation & Verification Guide | BC PNP Work Experience Requirements 2026: 2 Years, Which Jobs Count |
| Meta description | Everything you need to know about BC PNP work experience requirements. Learn what counts as eligible experience, how to document your work history, calculate part-time hours, verify international experience, and avoid the top rejection reasons in 2026. | Skilled Worker needs 2 years of full-time skilled (TEER 0–3) work from the last 10 years. Directly related experience then earns up to 40 SIRS points. |
| H1 | BC PNP Work Experience Requirements | How much work experience do you need for BC PNP? |
| First sentence | The complete guide to proving your work experience for BC PNP. | You need at least 2 years of full-time (or full-time equivalent) work experience in a skilled NOC TEER 0, 1, 2 or 3 occupation, gained in Canada or abroad within the last 10 years, to qualify for the BC PNP Skilled Worker stream. |
| Title length | 85 | 67 |
| Meta length | 252 | 150 |

### `/articles/bc-pnp-caregivers-childcare`

Search Console: 3,117 impr · 60 clicks · 1.92% CTR · #6.4

| | Before | After |
|---|---|---|
| Title | BC PNP for Caregivers & ECEs 2026: Complete Licensing & PR Guide | BC PNP Caregivers & Childcare 2026: ECEs 95, Care Aides 72, Nannies No |
| Meta description | Complete guide for Early Childhood Educators (ECE) and caregivers immigrating to BC. Learn about priority draws, wage enhancements ($4-6/hr), licensing steps, and the path to Permanent Residence. | Certified ECEs (Childcare draw, 95 on Nov 13, 2026) and care aides (Health, 72) can get BC PNP. Nannies and home support workers (TEER 4) cannot. |
| H1 | BC PNP for Caregivers & ECEs | Can caregivers and childcare workers get BC PNP? |
| First sentence | BC has a critical shortage of childcare workers. | Yes, if the job is TEER 0 to 3: certified early childhood educators are invited in Care: Childcare draws (minimum 95 on November 13, 2026) and health care aides in Care: Health draws (minimum 72), but nannies and home support workers (TEER 4) have no BC PNP stream in 2026. |
| Title length | 64 | 70 |
| Meta length | 195 | 145 |

### `/articles/bc-pnp-early-childhood-educators-2027`

Search Console: 732 impr · 21 clicks · 2.87% CTR · #6.3

| | Before | After |
|---|---|---|
| Title | BC PNP for Early Childhood Educators in 2027: Certification, Job Offers and Childcare Draws | BC PNP for Early Childhood Educators 2026: Childcare Draw Minimum 95 |
| Meta description | How ECEs get BC PNP invitations: ECE Registry certificates, employer rules, every 2026 Childcare draw cutoff, sample scores and what to expect in 2027. | Certified ECEs (NOC 42202) get their own draw: 95 points on Nov 13, 2026, 153 invited. Certificate, employer rules and a scored example. |
| H1 | BC PNP for Early Childhood Educators in 2027: Certification, Job Offers and Childcare Draws | How do early childhood educators get BC PNP? |
| First sentence | Early childhood educators have their own targeted draw in the BC PNP. | Certified early childhood educators (NOC 42202) register in the Skilled Worker stream with a full-time, indeterminate job offer from a licensed child care facility, and are invited in their own Care: Childcare draw, which needed 95 points on November 13, 2026. |
| Title length | 91 | 68 |
| Meta length | 151 | 136 |

### `/articles/bc-pnp-job-offer-requirements-2026`

Search Console: 1,641 impr · 31 clicks · 1.89% CTR · #8.0

| | Before | After |
|---|---|---|
| Title | BC PNP Job Offer Requirements 2026: Complete Employer & Wage Eligibility Guide | BC PNP Job Offer Requirements 2026: Full-Time, Indeterminate, Job Bank Wage |
| Meta description | Everything you need to know about BC PNP job offer requirements in 2026. Learn about eligible employers, wage thresholds, NOC code alignment, full-time offers, and the most common job offer mistakes that lead to application refusals. | Your offer must average 30+ hours a week year-round, have no end date and pay within the Job Bank range, from a B.C. employer operating 1+ year. |
| H1 | BC PNP Job Offer Requirements | What are the BC PNP job offer requirements? |
| First sentence | The complete 2026 guide to BC PNP job offer eligibility. | A BC PNP job offer must be for one regular full-time position (an average of at least 30 hours a week, year-round), indeterminate (no end date), in an eligible occupation, paid within the WorkBC or Job Bank wage range, and from an eligible B.C. employer that agrees to support you. |
| Title length | 78 | 75 |
| Meta length | 233 | 144 |

### `/articles/bc-pnp-without-job-offer`

Search Console: — (+ www: 114 impr, #6.03)

| | Before | After |
|---|---|---|
| Title | Can You Apply for BC PNP Without a Job Offer? (2026 Answer + Alternatives) | BC PNP Without a Job Offer in 2026? No: Every Worker Stream Needs One |
| Meta description | Every BC PNP worker stream needs a B.C. job offer in 2026. See which streams require one, the LMIA question and verified no-job-offer options elsewhere. | 0 of the 3 BC PNP worker pathways accept you without a B.C. job offer. Only Entrepreneur Immigration does; its latest Base round needed 117 points. |
| H1 | Can You Apply for BC PNP Without a Job Offer? (2026 Answer + Alternatives) | Can you apply for BC PNP without a job offer? |
| First sentence | The short answer is no for workers, and the old exceptions are gone. | No: in 2026 all three BC PNP worker pathways (the Skilled Worker stream, the Health Authority stream and the temporary Rural/Remote Health Support Initiative) require a job offer from a B.C. employer, and only Entrepreneur Immigration accepts candidates without one. |
| Title length | 74 | 69 |
| Meta length | 152 | 147 |

### `/articles/how-to-apply-bc-pnp`

Search Console: 1,111 impr · 11 clicks · 0.99% CTR · #20.97 (+ www: 9 impr, #1.67)

| | Before | After |
|---|---|---|
| Title | How to Apply for BC PNP 2026: The Step-by-Step Authority Guide | How to Apply for BC PNP in 2026: 6 Steps (Register → ITA → Apply) |
| Meta description | The only guide you need. Complete walkthrough of SIRS registration, document uploading, application fees, and what to do after you get invited. | Register free, wait for an invitation, then submit your application and the $1,750 fee within 30 days. WelcomeBC processes most in about 3 months. |
| H1 | How to Apply for BC PNP | How do you apply for BC PNP? |
| First sentence | It's not just a form—it's a legal petition. | You apply for the BC PNP in 6 steps: choose a stream, register online for free, wait for an invitation to apply, submit your application and the $1,750 fee within 30 days, wait about 3 months for a decision, then apply to IRCC for permanent residence. |
| Title length | 62 | 65 |
| Meta length | 143 | 146 |

### `/articles/bc-pnp-calculator-for-tech`

Search Console: — (+ www: 873 impr, #11.81)

| | Before | After |
|---|---|---|
| Title | BC PNP Calculator for Tech Workers & High-Demand Occupations (2026) | BC PNP Tech 2026: Eligible NOC Codes and Your Score |
| Meta description | Special guide for Tech, Healthcare, and Construction workers. See why your BC PNP score requirements are lower and how to qualify for targeted draws. | 35 tech NOC codes are on the Program Guide list. Tech draws ended Dec 2024; tech workers now need 131 points or $49/hr in High Economic Impact draws. |
| H1 | BC PNP for Tech & High-Demand Workers | Which tech jobs are eligible for BC PNP? |
| First sentence | If you're an engineer, developer, nurse, or trade worker, the rules are different for you. | 35 technology occupations, from software developers (NOC 21232) to graphic designers (52120), are listed in the BC PNP Program Guide, but tech draws ended on December 3, 2024. |
| Title length | 67 | 51 |
| Meta length | 149 | 149 |

### `/bc-pnp-guide`

Search Console: 859 impr · 8 clicks · 0.93% CTR · #7.55

| | Before | After |
|---|---|---|
| Title | BC PNP Guide 2026: Scoring Secrets, Deadlines & Real Draw Data | BC PNP Guide 2026: Streams, Points, Draws and Fees in One Page |
| Meta description | Forget the generic advice. This is your deep-dive 2026 guide to the British Columbia Provincial Nominee Program. Regional hacks, priority stream deadlines, and how to actually get that ITA. | 2 worker streams, a 200-point score, draws as low as 72 (November 13, 2026) and a $1,750 fee. How the BC PNP works in 2026, with every guide by topic. |
| H1 | The No-BS Guide to BC PNP in 2026 | How does the BC PNP work in 2026? |
| First sentence | Stop guessing. | The BC PNP nominates workers who have a full-time, indeterminate B.C. job offer through 2 Skills Immigration streams (Skilled Worker and Health Authority), ranks registrations out of 200 points, invites them in Care, Build and High Economic Impact draws, and charges $1,750 to apply. |
| Title length | 62 | 62 |
| Meta length | 189 | 150 |

## The 4 example profiles

They appear on the homepage under "Example scores" (`src/data/example-profiles.ts`, rendered by `src/components/seo/ExampleProfiles.astro`). Each one is scored by the same engine as the live calculator, and I checked every line by hand against the Part 8 tables. Wages are example offers, not wage data. Each page says that a real offer must fall within the WorkBC / Job Bank range (Program Guide 3.9).

| Profile | Inputs | Experience /40 | Education /40 | Language /40 | Wage /55 | Area /25 | **SIRS** | Latest draw for the stream |
|---|---|---:|---:|---:|---:|---:|---:|---|
| Tech: software developer (NOC 21232), Vancouver, Area 1 | 4 yrs directly related (1 in Canada), working for employer now; bachelor's from abroad; CLB 8; $45.00/hr | 16+10+10 = 36 | 15 | 25 | 30 | 0 | **106** | High Economic Impact points: 131 (Oct 29, 2026). 25 below; $45/hr = $93,600/yr misses the $49/hr and $99,000/yr wage track |
| ECE (NOC 42202), Kelowna, Area 3 | 2 yrs ECE in Canada, working for employer now; diploma completed in B.C.; ECE Five Year Certificate; CLB 7; 1 yr earlier work outside Metro Vancouver; $24.00/hr | 8+10+10 = 28 | 5+8+5 = 18 | 20 | 9 | 15+10 = 25 | **100** | Childcare: 95 (Nov 13, 2026). 5 above (the same person in Metro Vancouver scores 75) |
| Healthcare: registered nurse (NOC 31301), Surrey, Area 1 | 5+ yrs (1+ in Canada), working for employer now; BSN from abroad; CLB 8; $47.00/hr | 20+10+10 = 40 | 15 | 25 | 32 | 0 | **112** | Health: 72 (Nov 13, 2026). 40 above |
| Caregiver: health care assistant (NOC 33102), Abbotsford, Area 2 | 2 yrs in Canada, working for employer now; HCA certificate completed in B.C.; on the BC Care Aide & Community Health Worker Registry; CLB 5; 1 yr earlier work outside Metro Vancouver; $27.00/hr | 8+10+10 = 28 | 5+8+5 = 18 | 10 | 12 | 5+10 = 15 | **83** | Health: 72 (Nov 13, 2026). 11 above |

Sources for each factor:

- experience points: Program Guide 8.1
- education and professional designation (ECE certificate, HCA registry): 8.2
- CLB points: 8.3
- wage: 8.4 ($X.00–$X.99 = X − 15 points from $16, 55 at $70+)
- Area 1/2/3 and regional experience: 8.5
- draw minimums: WelcomeBC invitations page

## Link report

Measured on the built HTML with `scripts/seo/link-report.mjs`:

- **Content links in**: how many other pages link to a page from inside `<main>`. The article author bio is excluded, and each linking page counts once.
- **Click depth**: number of clicks from `/` following every internal link (menu, footer, content).
- **Content-only depth**: the same, following content links only.

| | Before (`main`) | After (this branch) |
|---|---:|---:|
| Pages | 125 | 125 |
| Pages deeper than 2 clicks (all links) | 1 | 0 |
| Pages deeper than 2 clicks (content links only) | 94 | 2 (privacy policy and terms) |
| Pages that no other page links to from content | 2 (/guides, /sitemap) | 0 |

Key pages:

| Page | Content links in: before → after | Click depth: before → after | Content-only depth: before → after |
|---|---|---|---|
| `/` | 14 → **121** | 0 → 0 | 0 → 0 |
| `/bc-pnp-draws` | 33 → **114** | 1 → 1 | 2 → 1 |
| `/bc-pnp-calculator` | 117 → **111** | 1 → 1 | 1 → 1 |
| `/articles/bc-pnp-work-experience-requirements-2026` | 8 → **112** | 2 → 1 | 2 → 1 |
| `/articles/bc-pnp-caregivers-childcare` | 6 → **113** | 2 → 1 | 3 → 1 |
| `/articles/bc-pnp-early-childhood-educators-2027` | 7 → **112** | 2 → 1 | 3 → 1 |
| `/articles/bc-pnp-job-offer-requirements-2026` | 15 → **112** | 2 → 1 | 2 → 1 |
| `/articles/bc-pnp-without-job-offer` | 4 → **112** | 2 → 1 | 3 → 1 |
| `/articles/how-to-apply-bc-pnp` | 20 → **113** | 1 → 1 | 3 → 1 |
| `/articles/bc-pnp-calculator-for-tech` | 10 → **115** | 1 → 1 | 1 → 1 |
| `/bc-pnp-guide` | 4 → **15** | 1 → 1 | 1 → 1 |
| `/articles/bc-pnp-innovate-high-economic-impact-draws-2027` | 6 → **112** | 2 → 1 | 3 → 1 |
| `/articles/bc-pnp-cost-guide-2026` | 25 → **114** | 2 → 1 | 3 → 1 |
| `/zh` | 3 → **4** | 1 → 1 | 4 → 1 |
| `/zh/bc-pnp-guide` | 3 → **3** | 2 → 2 | 2 → 2 |
| `/guides` | 0 → **2** | 1 → 1 | — → 1 |
| `/sitemap` | 0 → **1** | 1 → 1 | — → 2 |

How the links were added:

- **"Related calculators and guides"** (`src/components/seo/RelatedLinks.astro`) sits inside the content at the end of every article and of `/`, `/bc-pnp-draws`, `/bc-pnp-calculator` and `/bc-pnp-guide`. It holds 12 links, each anchored with the target's query plus its number or promise.
- A **"Calculate your score"** call to action to `/` is added to every article.
- The **7 rewritten guides** each carry 2–4 links inside their sentences: the calculator, the draws page, and 1–2 sibling guides (work experience ↔ job offer ↔ caregivers/ECE ↔ tech).
- **The homepage** links from its content to the draws page, every guide with impressions, the guides library and the language twins.
- **`/bc-pnp-guide`** is the hub: one line and a link for every BC PNP guide, grouped into Eligibility, Streams and occupations, Scores and draws, and How to apply.
- Anchors are the query, never "click here" or "read more", with at most one link to the same page per section.
- **Language twins**: `/` ↔ `/zh` · `/hi` and `/bc-pnp-guide` ↔ `/zh/bc-pnp-guide` · `/hi/bc-pnp-guide` are linked inside the content.

## Technical

- **Canonical host**: www already returns a 301 to the apex domain (checked 2026-11-26). `vercel.json` now states the www → apex redirect explicitly, and every internal link is relative or uses the apex host.
- **Real lastmod**: sitemap `<lastmod>` comes from each page's own `dateModified`, `DATE_MODIFIED` or `DRAWS_LAST_UPDATED_ISO`, not the build time (`scripts/seo/lastmod.mjs`). Before, all 125 URLs carried the same build timestamp. Now each URL carries its real date.
- **Server-rendered HTML**: the calculator and the draws table are both in the server HTML. The calculator's first step renders on the server through `client:load`. The draw tables are static HTML; JavaScript only adds the "cleared / missed" column on the draw calculator.
- **Ads**: ads are off site-wide (`ADS_ENABLED = false` in `AdUnit.astro`), and no ad slot sits above the calculator on `/`. The calculator is the first thing after the H1 and one sentence on a phone. The top "Advertise here?" announcement bar is the site's own banner, not an ad slot, and is unchanged.
- **IndexNow**: submit only the 11 changed URLs, after the merge has deployed (the key file is already live):

```bash
node scripts/indexnow-submit.mjs $(cat docs/indexnow-2026-11.txt)
```

## Two-week check-back list

Baseline = Search Console, last 3 months to 2026-11-24, apex URL. Check 14 days after the deploy, and compare the same 14 days before and after so the baseline is like-for-like. Fill in the empty columns.

| Page | Baseline position | Baseline CTR | Baseline clicks / impr. (3 mo) | Day-14 position | Day-14 CTR | Notes |
|---|---:|---:|---:|---:|---:|---|
| `/` | 4.58 | 16.17% | 4071 / 25,184 | | | |
| `/bc-pnp-draws` | 10.11 | 1.39% | 90 / 6,491 | | | |
| `/bc-pnp-calculator` | 1.33 | 0% | 0 / 3 | | | |
| `/articles/bc-pnp-work-experience-requirements-2026` | 6.2 | 2.03% | 70 / 3,440 | | | |
| `/articles/bc-pnp-caregivers-childcare` | 6.4 | 1.92% | 60 / 3,117 | | | |
| `/articles/bc-pnp-early-childhood-educators-2027` | 6.3 | 2.87% | 21 / 732 | | | |
| `/articles/bc-pnp-job-offer-requirements-2026` | 8.0 | 1.89% | 31 / 1,641 | | | |
| `/articles/bc-pnp-without-job-offer` | — | — | — | | | |
| `/articles/how-to-apply-bc-pnp` | 20.97 | 0.99% | 11 / 1,111 | | | |
| `/articles/bc-pnp-calculator-for-tech` | — | — | — | | | |
| `/bc-pnp-guide` | 7.55 | 0.93% | 8 / 859 | | | |

Queries to watch, with baseline position and impressions (3 months):

- **`/`**:
  - bc pnp calculator: #6.15, 4,422 impr., 6.2% CTR
  - bc pnp points calculator: #3.61, 3,154 impr., 11.1% CTR
  - bc pnp score calculator: #5.52, 1,051 impr.
  - calculate bc pnp points: #6.71, 154 impr.
  - sirs calculator: #4.84, 102 impr.
- **`/bc-pnp-draws`**:
  - bc pnp latest draw: #22.3, 229 impr.
  - latest bc pnp draw: #24.0, 169 impr.
  - bc pnp latest draw 2026: #10.6, 116 impr.
  - bcpnp last draw: #9.9, 97 impr.
  - bc pnp cut off score: #6.5, 22 impr.
- **`/bc-pnp-calculator`**: bc pnp draw calculator, #5.87, 105 impr. Also watch that "bc pnp calculator" impressions move to `/` rather than disappear.
- **Work experience**:
  - how much experience required for bc pnp: #6.34, 67 impr.
  - bc pnp work experience requirements: #6.59, 49 impr.
  - lowest work experience pnp 2026: #16.1, 49 impr.
- **Caregivers**: is ecea eligible for bc pnp, #8.5, 22 impr.
- **ECE**:
  - bc pnp ece latest draw: #8.93, 27 impr.
  - bc pnp ece requirements: #9.38, 13 impr.
- **Job offer**:
  - bc pnp job offer requirements: #8.04, 24 impr.
  - bc pnp wage requirement: #14.9, 9 impr.
- **Tech**: bc pnp tech, #31.3, 78 impr.
- **How to apply**: how to apply for bc pnp, #7.4, 5 impr.
- **Guide**: bc pnp guide 2026, #7.54, 41 impr.

Also check:

- the Search Console coverage report for `/bc-pnp-calculator`: it should stay indexed under its new title
- the FAQ, Breadcrumb and Article rich result reports for the 11 changed URLs
- that sitemap `<lastmod>` dates were read correctly
