# Biology with Hamza — appearance and learning comfort update

This complete source package builds on the full-site upgrade. Upload its extracted contents into the existing repository root. The previously delivered articles, 69 activities, 16 chapter routes, 1,600 practice questions and expanded Human Atlas are included.

## New in this update

- Header Theme control on desktop and mobile: Light, Dark or System.
- System follows the device preference and updates when it changes.
- Saved theme is applied in the page head before rendering, avoiding a light-theme flash on dark visits.
- Dark surfaces, readable text, form controls, cards, tables, search, quizzes, resources, Cambridge pages and Atlas panels.
- Anatomy canvas keeps its separate Light/Charcoal selector. Scientific diagrams keep their existing teaching colours on a neutral background.
- Article text-size control: Standard, Large, Extra large; saved across article visits.
- Corrected article reading progress to measure scroll through the article body.
- Recent-learning cards on the homepage and workspace; up to six recent pages are stored locally, with the latest three displayed.
- Clear recent history without removing bookmarks, notes or completion progress.
- More compact responsive header, visible active mobile navigation, keyboard Escape handling, improved focus outlines and scrollable article contents.
- Existing reduced-motion and print layouts remain supported.

Theme, text-size and recent history are stored in the current browser, separately from the existing study-progress backup. These preferences are not user accounts or cross-device synchronization. If browser storage is unavailable, appearance controls still work during the current session; persistence and recent history may be unavailable.

## Upload once using GitHub Desktop

1. Extract this ZIP.
2. In GitHub Desktop, select Biologywithhamza and the main branch. Fetch/Pull existing remote changes first.
3. Use Repository → Show in Explorer. Copy the extracted contents into that repository folder, replacing matching files. Keep the repository's existing Git metadata.
4. Check the Changes list. Do not add node_modules, out, .next or another ZIP.
5. Commit message: `Add dark theme and improve learning experience`.
6. Commit to main, then Push origin.

Cloudflare Pages settings stay: build command `npm run build:netlify`, output directory `out`. The build script name is historical; it generates static files suitable for Cloudflare Pages. No domain/DNS change or new service is required. This package has not been pushed or deployed for you.

## Validation

- Production static build passed: 142 generated build entries.
- 13 automated tests passed: bank integrity, quiz randomization, biological model invariants, chapter/activity catalogues, exported local links, appearance initialization, invalid/denied storage and core contrast pairs.
- Changed TypeScript components passed ESLint.
- Headless Chromium checks: theme selection and persistence, System preference changes, 22px article text, recent-learning navigation, no observed page JavaScript errors.
- Ten representative routes checked at 1440px and 390px widths without horizontal document overflow.
- Additional computed text-contrast scan across 11 initial page states found no flagged pairs for the text it could evaluate. This excludes image/gradient backgrounds, diagrams, disabled controls and unexercised interactive states; it is not a full accessibility certification.
- Desktop/mobile screenshots are included in release-notes. Hardware-dependent Atlas rendering and every possible quiz/activity state were not re-audited in this appearance pass.

## Developer notes

`app/appearance.tsx` owns theme and reading preferences; `app/appearance-bootstrap.ts` applies preferences before paint. `app/recent-learning.tsx` owns the recent history. `app/appearance.css` contains the new controls and design tokens. Legacy dark surface overrides in `app/theme-surfaces.css` are generated with `npm run theme:generate`; review the output after changing legacy CSS. This does not recolour 3D anatomical meshes.

Run `npm ci` then `npm run test:static` for the static build and regression tests. Previous feature notes are archived in release-notes/PREVIOUS_FULL_SITE_UPDATE.md.
