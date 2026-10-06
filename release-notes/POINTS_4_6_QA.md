# Points 4–6 release verification

Verified 2026-10-05 against the local production export.

## Automated application checks

24 tests across question-bank structure/randomisation, internal links, lab models, theme behavior, revision intervals/history, Cambridge topic coverage, chapter-pack connectivity and complete-learning backup validation/rollback. Changed application files pass ESLint. Production build includes TypeScript checking and generates 161 entries.

## Browser checks

- Empty-answer reveal disabled; typed response can be saved/submitted.
- Model answer and marking points appear after submission; self-check survives refresh.
- Command-word exercise feedback, topic filtering and data-table rendering.
- Chapter checklist persistence and all six connected sections.
- Revision-sheet answer-key toggle and print styling; an A4 PDF was generated during QA.
- Full backup export and confirmed restore reproduce written answers and completion marks.
- 1440px desktop and 390px mobile, light and dark: no horizontal page overflow in new routes and no JavaScript page errors in the walkthrough.
- Configured account branch tested with intercepted service responses: email code request, invalid-code rejection, verified sign-in, cloud-save confirmation, restore on an independent browser profile, version-conflict handling, cloud deletion and sign-out.
- Fixed a sign-out form reset bug found during these checks.

## Database checks

Executed supabase/setup.sql in PGlite with test auth roles and users. Owner save/read worked; user B could not read, insert for, update or delete user A's record; anonymous read/save was denied. First save, incremented save, duplicate initial save and stale-version handling behaved as intended.

To repeat the optional SQL check in a development checkout: install @electric-sql/pglite without saving it to package.json, then run node scripts/verify-account-policies.mjs. It creates only an in-memory local test database.

## Boundaries

No real authentication project, student accounts, emails or production database were created. Frontend simulation is not a live delivery test. ACCOUNT_SETUP.md includes the actual two-device and two-account checks required after activation. Existing Atlas geometry was preserved, not re-audited anatomically in this release.

## Academic reference

Cambridge O Level Biology 5090, 2026–2028 syllabus, version 4, including its command-word section:
https://www.cambridgeinternational.org/Images/697330-2026-2028-syllabus.pdf

New questions and teaching guidance are original and independently written. Model answers and mark allocations are teaching aids, not official mark schemes. Mathematical examples were checked: cell magnification ×600; potato mass change −12%; cardiac output 5.25 dm³/min; dwarf probability 25%; trophic transfer 12%.
