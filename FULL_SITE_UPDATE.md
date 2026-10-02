# Biology with Hamza — revision workspace update

This is the complete website source, including the existing dark/light/system theme, Atlas, 69 activities, 23 articles, 16 chapter routes, Cambridge pages and 1,600-question bank.

## New in this release

- Revision dashboard at /revision with per-chapter feedback from fresh attempts.
- Mistake notebook with chapter/search/status filters, answer explanations and pagination.
- Question-by-question snapshots for the latest 50 completed attempts, including unanswered questions.
- Fresh practice, mistake practice and scheduled review modes; immediate retry remains available.
- Review intervals of 1, 3, 7, 14, 30 and 60 days. Only correct answers at/after the due time advance the interval; a miss resets it.
- Two successful spaced reviews remove a question from Needs practice but keep maintenance reviews scheduled.
- Fresh-practice accuracy uses the latest response per distinct question in retained fresh attempts. Retry/review scores do not inflate this measure. Small samples are labelled.
- Export/restore revision backups with validation and an explicit restore confirmation.
- Question reports can be copied or downloaded for sharing manually with the teacher.
- 64 new independently written applied questions (four per chapter), replacing 64 integrated variants. Total remains 100 questions per chapter. New items include numerical reasoning, experimental tables and process sequences.
- Revision links in navigation, search, footer and learning workspace.

## What is stored

Profiles and records stay in this browser under the local student ID. This release does not add online accounts, authentication, automatic synchronization or a reporting server. Export backups to transfer records between devices. Existing bookmarks/study notes have a separate backup. Older score-only history remains in Practice; detailed answers begin after this update. Records from retired or revised questions remain as historical snapshots but are excluded from current revision pools.

These scores describe the practice bank, not a predicted examination result. Spacing is a simple review schedule, not a clinically or statistically validated mastery model. The bank contains related concept variants; see release-notes/QUESTION_BANK_AUDIT.md for the exact scope of this improvement.

## Upload once with GitHub Desktop

1. Extract this ZIP.
2. Select Biologywithhamza and main in GitHub Desktop. Fetch/Pull remote changes first.
3. Choose Repository → Show in Explorer. Copy the extracted contents into that repository folder and replace matching files.
4. Do not copy node_modules, out, .next or a ZIP into the repository.
5. Commit with: Add revision dashboard and mistake notebook
6. Push origin once.

Cloudflare Pages stays on build command npm run build:netlify and output directory out. The script now explicitly uses Webpack, which produced the verified static export; the default Turbopack process stalled in the verification environment. No DNS change, new paid service or database is required. Nothing was deployed by this update.

## Verification

Production static export, TypeScript, ESLint on changed code, existing content/link/model/theme tests, and new revision-model tests. See release-notes/REVISION_QA.md for browser verification results.
