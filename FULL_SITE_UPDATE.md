# Biology with Hamza — Cambridge, chapter packs and accounts

This is the complete website source package. It preserves the theme controls, expanded Human Atlas, 69 activities, 23 articles, 1,600-question MDCAT bank, revision dashboard and mistake notebook from the previous release.

## Point 4 — Cambridge answer practice

- New /cambridge-practice page.
- 38 original structured questions: two for each of the 19 existing Cambridge O Level 5090 topics.
- 10 command-word exercises and a concise teaching reference.
- Topic, command-word and text filters; paginated question cards.
- Write before revealing: empty answers cannot reveal the model answer.
- Saved drafts, submitted answers, teaching points, model responses and tickable self-assessment.
- Clear distinction between self-assessment and official/automatic marking.
- Links from the Cambridge landing page and every topic route.

These are original teaching questions aligned to the direction of the 2026–2028 syllabus, not official past papers or Cambridge mark schemes. Two questions per topic provide a starting practice set, not exhaustive syllabus assessment. The latest saved response to each question is retained.

## Point 5 — connected chapter packs

All 16 MDCAT /learn chapter pages now connect six sections: lesson, notes, activity, diagram, quiz and revision sheet. A saved six-step checklist helps students work through the chapter. Existing detailed article lessons, activities and question files are reused rather than duplicated.

Each chapter has a dedicated /learn/CHAPTER/revision page containing learning targets, core notes, a concept diagram, written recall prompts, three applied MCQs and an optional answer key. Use Print / save as PDF to download it through the browser. These pages print in a clean light layout even when the website is in dark mode.

Notes links open the verified shared Drive folder, not guessed individual files. A chapter-specific video is used when one is present in the existing video catalogue; otherwise the link is explicitly labelled as the complete teaching playlist.

## Point 6 — optional student accounts

The implementation includes email-code sign-in using Supabase Auth, private PostgreSQL progress storage, row-level access policies, complete learning backups, preview/confirmation before restore, explicit cloud saves and conflict detection. It supports carrying a snapshot of progress between devices after signing in with the same account.

**One-time activation is still required.** No Supabase project, email sender or credentials were supplied or created. Read ACCOUNT_SETUP.md and run supabase/setup.sql in your own project, configure email delivery, then add the two public build variables in Cloudflare Pages. Until then the Account page states online sign-in is unavailable, while local learning and downloadable backups work normally.

Sync is manual and replaces a selected snapshot after confirmation; it does not merge simultaneous edits or provide live collaborative syncing. Sign-out ends the online session but retains local learning records. There is no teacher administration portal or automatic question-report delivery in this release.

## Upload with GitHub Desktop

1. Extract the ZIP.
2. In GitHub Desktop, select Biologywithhamza and main; Fetch/Pull first.
3. Choose Repository → Show in Explorer. Copy these extracted contents into the repository root, replacing matching files.
4. Keep the repository's Git metadata. Do not add node_modules, out, .next or the ZIP itself.
5. Commit message: Add Cambridge practice, chapter packs and optional accounts
6. Push origin once.

Cloudflare Pages: build command npm run build:netlify; output directory out. No DNS changes are needed. The package has not been pushed or deployed on your behalf.

## Verification

Production export: 161 generated entries. Changed application code passes ESLint and build-time TypeScript checking. All 24 content, model, appearance, revision and new-feature tests pass. Desktop/mobile browser checks pass in light and dark modes. The sign-in/sync frontend was checked with simulated service responses; SQL access controls and version checks were executed in a local PostgreSQL-compatible test runtime. Actual production email delivery and live Supabase account isolation must be checked after your setup.

See release-notes/POINTS_4_6_QA.md and ACCOUNT_SETUP.md.
