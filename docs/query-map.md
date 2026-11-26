# Query → page map (bcpnpcalculator.ca)

Source: Google Search Console export, Web search, **last 3 months (2026-08-25 to 2026-11-24)**, downloaded 2026-11-26 (`Queries.csv`, `Pages.csv`).
Site totals in the export: 4,782 clicks, 50,292 impressions (sum of Devices.csv).

**How to read this**

- The Search Console export lists queries and pages separately, not query × page. Each query family is assigned to the page whose
  intent it matches. Page totals come from `Pages.csv`, query totals from `Queries.csv`.
- `Queries.csv` only holds the top 1,000 queries, and Search Console leaves out anonymized queries. Page impressions are therefore
  much higher than their family's query impressions. Example: the work experience guide shows 3,440 impressions in `Pages.csv`, but its
  listed queries add up to 209.
- The direct Search Console API pull through the connected AdvisorPPC tool was blocked by the session's permission policy, so this map
  is built from the uploaded export only.
- "Pos." is the impression-weighted average position. The www rows in `Pages.csv` are legacy URLs: www already returns a 301 to the
  apex domain (checked 2026-11-26).

## One owner page per query family

| Query family | Owner page | Queries | Impr. | Clicks | CTR | Pos. | Biggest queries (impr., position) |
|---|---|---:|---:|---:|---:|---:|---|
| bc pnp calculator / points / score calculator (2026, ircc, official) | `/` | 183 | 15,531 | 2,832 | 18.2% | 4.8 | bc pnp calculator (4,422, #6.2) · bc pnp points calculator (3,154, #3.6) · bc pnp calculator 2026 (1,349, #1.5) · bc pnp score calculator (1,051, #5.5) · bc pnp points calculator 2026 (899, #1.4) · bcpnp score calculator (884, #4.3) |
| bc pnp sirs calculator / sirs score calculator / how to calculate bc pnp points | `/`, section "How do I calculate BC PNP points?" | 33 | 657 | 128 | 19.5% | 4.2 | calculate bc pnp points (154, #6.7) · sirs calculator (102, #4.8) · how to calculate bc pnp points (101, #1.8) · bc pnp sirs calculator (85, #2.9) · sirs score calculator (40, #3.6) |
| bc pnp draw calculator | `/bc-pnp-calculator` (now the draw calculator) | 2 | 113 | 7 | 6.2% | 5.8 | bc pnp draw calculator (105, #5.9) · pnp draw calculator (8, #4.8) |
| bc pnp draws / latest draw / minimum score / cut off / next draw | `/bc-pnp-draws` | 117 | 1,761 | 20 | 1.1% | 18.9 | bc pnp latest draw (229, #22.3) · latest bc pnp draw (169, #24.0) · bc pnp latest draw 2026 (116, #10.6) · bc pnp draw today (107, #33.1) · bcpnp last draw (97, #9.9) · bc pnp draw (93, #31.0) |
| bc pnp high economic impact | `/articles/bc-pnp-innovate-high-economic-impact-draws-2027` | 10 | 34 | 0 | 0% | 6.6 | bc pnp high economic impact (19, #6.6) |
| bc pnp work experience requirements | `/articles/bc-pnp-work-experience-requirements-2026` | 15 | 209 | 1 | 0.5% | 9.1 | how much experience required for bc pnp (67, #6.3) · bc pnp work experience requirements (49, #6.6) · lowest work experience pnp 2026 (49, #16.1) · bc pnp work experience (27, #6.6) |
| bc pnp caregivers / childcare / ECE assistant | `/articles/bc-pnp-caregivers-childcare` | 20 | 61 | 2 | 3.3% | 7.9 | is ecea eligible for bc pnp (22, #8.5) · bc pnp childcare (5) · bc pnp childcare requirements (5) |
| bc pnp early childhood educators / ECE requirements / ECE draw | `/articles/bc-pnp-early-childhood-educators-2027` | 15 | 78 | 1 | 1.3% | 9.1 | bc pnp ece latest draw (27, #8.9) · ece wage enhancement 2027 bc (15, #14.7) · bc pnp ece requirements (13, #9.4) |
| bc pnp job offer requirements / wage requirement | `/articles/bc-pnp-job-offer-requirements-2026` | 9 | 71 | 1 | 1.4% | 11.6 | bc pnp job offer requirements (24, #8.0) · bc pnp job offer (18, #9.3) · bc pnp wage requirement (9, #14.9) |
| bc pnp without job offer | `/articles/bc-pnp-without-job-offer` | 1 | 1 | 0 | 0% | 3.0 | i dont have a job offer (1) |
| bc pnp tech | `/articles/bc-pnp-calculator-for-tech` | 7 | 100 | 0 | 0% | 31.2 | bc pnp tech (78, #31.3) · bc tech pnp (11, #25.6) |
| how to apply / bc pnp application | `/articles/how-to-apply-bc-pnp` | 11 | 51 | 1 | 2.0% | 40.7 | bc pnp application (12, #41.2) · apply for bc pnp (9, #52.9) · how to apply for bc pnp (5, #7.4) |
| bc pnp fees | `/articles/bc-pnp-cost-guide-2026` | 12 | 97 | 0 | 0% | 15.1 | bc pnp fees 2026 (30, #10.4) · bc pnp application fee (27, #16.2) |
| bc pnp guide / bc pnp / requirements | `/bc-pnp-guide` | 29 | 169 | 16 | 9.5% | 18.5 | bc pnp (43, #3.2) · bc pnp guide 2026 (41, #7.5) · bc pnp requirements (13, #3.6) |
| bc pnp news | `/news` | 7 | 149 | 0 | 0% | 27.3 | latest pnp news (73, #34.0) · bc pnp news (47, #21.4) |
| Long tail / off-topic | — | 529 | 996 | 23 | 2.3% | 18.3 | yes (93) · cbp initial assessment kelowna (44, #94.9) · bc pnp registration (19, #14.3) |

The anchor text every page uses to link to an owner page is set in `src/data/site-links.ts`. Each anchor is the target query plus its number or promise.

## Page totals (Pages.csv, apex + www combined)

| Page | Impr. | Clicks | CTR | Position (apex) |
|---|---:|---:|---:|---:|
| `/` | 25,193 | 4,072 | 16.2% | 4.58 |
| `/bc-pnp-draws` | 6,582 | 92 | 1.4% | 10.11 |
| `/bc-pnp-calculator` | 3,771 | 247 | 6.5% | 6.72 |
| `/articles/bc-pnp-work-experience-requirements-2026` | 3,441 | 70 | 2.0% | 6.2 |
| `/articles/bc-pnp-caregivers-childcare` | 3,117 | 60 | 1.9% | 6.4 |
| `/articles/bc-pnp-job-offer-requirements-2026` | 1,641 | 31 | 1.9% | 8.0 |
| `/articles/how-to-apply-bc-pnp` | 1,120 | 11 | 1.0% | 20.97 |
| `/articles/bc-pnp-calculator-for-tech` | 873 | 10 | 1.1% | 11.81 (www) |
| `/bc-pnp-guide` | 859 | 8 | 0.9% | 7.55 |
| `/articles/bc-pnp-early-childhood-educators-2027` | 732 | 21 | 2.9% | 6.3 |
| `/zh` | 662 | 115 | 17.4% | 5.27 |

## Overlaps and how they're resolved

| Query family | Pages competing (before) | Resolution in this PR |
|---|---|---|
| **bc pnp calculator / points calculator** | `/` (25,184 impr., #4.6, title "BC PNP Calculator 2026", no calculator on the page) and `/bc-pnp-calculator` (3,525 impr. + 243 www, #6.7, title "Free BC PNP Points Calculator…"). Internal links pointed at `/bc-pnp-calculator`: **117 pages linked to it from their content, 14 to `/`**. | The calculator now runs on `/`. All 177 internal "calculator" links, plus the nav and footer, now point to `/` (117 → 0 calculator-anchor links into `/bc-pnp-calculator`). `/bc-pnp-calculator` became the **BC PNP Draw Calculator** (its own query: "bc pnp draw calculator", 105 impr., #5.9), with a new title and H1, and its hreflang link to the localized points calculators removed. Its remaining 111 inbound links come from the "Related calculators and guides" block, with the anchor "BC PNP draw calculator: your score vs every 2026 draw". |
| bc pnp ECE / childcare | `/articles/bc-pnp-caregivers-childcare` and `/articles/bc-pnp-early-childhood-educators-2027` were both written as ECE guides. | Caregivers page = who in childcare and caregiving qualifies (ECEs and care aides yes, ECE assistants and nannies no). ECE page = certificate, employer and every Childcare draw. Each links to the other inside its text. |
| bc pnp tech | `/articles/bc-pnp-calculator-for-tech` (873 impr.), `/articles/bc-pnp-tech-stream-occupations`, `/articles/tech-workers-bc-pnp-2027-after-tech-draws-ended` | Owner = `bc-pnp-calculator-for-tech`, which now targets "BC PNP Tech 2026: Eligible NOC Codes and Your Score". All pages link to it with the anchor "BC PNP tech: 35 eligible NOC codes and your score". Follow-up: add an in-sentence link from the other two tech articles to the owner. |
| bc pnp latest draw | `/bc-pnp-draws`, `/articles/bc-pnp-draw-november-13-2026`, `/articles/bc-pnp-2026-draws-recap-2027-forecast` | Owner = `/bc-pnp-draws`. Its title and first sentence now name the latest draw. Every page links to it with the anchor "BC PNP draws 2026: latest minimum {N} ({date})". |
| how to apply / bc pnp guide | `/articles/how-to-apply-bc-pnp`, `/bc-pnp-guide`, `/articles/ultimate-bc-pnp-guide-2026` | `/bc-pnp-guide` is the hub ("BC PNP Guide 2026: Streams, Points, Draws and Fees in One Page") and lists every guide by topic. How-to-apply owns the process query. The ultimate guide is listed in the hub under "How to apply". |
