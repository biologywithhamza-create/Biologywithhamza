# Biology with Hamza — UI redesign and Human Atlas

Prepared 8 September 2026. Upload-ready source; no live deployment was performed.

## The new interface

The whole site now uses a light learning-studio design with forest green text,
lime, orange and lilac panels, bold sans-serif headings, an interactive track
switcher, full-card links, native search dialog, keyboard focus and mobile menu.
The current real portrait remains; no replacement photographs were supplied.

## Human Atlas

- `/atlas` contains 2,234 selectable reference structures and 3,432 searchable
  anatomical concepts across 15 systems.
- Left sidebar: organ search, six body-region views, layer checkboxes and quick
  presets for organs, skeleton, muscles and all systems.
- Rotate, zoom, front/back/side views, isolate a structure and show it in the body.
- Approximately 33 MB of detailed geometry loads only after opening the viewer.
- If WebGL is unavailable, the atlas uses a 5.9 MB reduced-detail reference model
  and a canvas renderer, preserving all 2,234 selectable structures.
- Adult male anatomy from BodyParts3D, with attribution and licences included.
  Female anatomy, all anatomical variants, microscopic histology, and clinical
  diagnosis are outside this model. Region boundaries are approximate filters.
- Many selections share a system-level explanation, clearly labelled as context.

## Biology Lab

`/lab` includes three interactive learning models: enzyme saturation, initial
osmotic water movement and monohybrid genetic crosses. Each states its
assumptions, has controls that change the output, and links to references.

## Validation

- `npm run build:netlify` compiled and exported successfully, including TypeScript.
- Checked 1,600 unique question IDs, 100 in each of 16 chapters, four distinct
  options per question and valid answer keys. Thirty shuffled full-chapter tests
  preserved the correct answer after option shuffling; successive sets avoided
  recent questions where the pool allowed it.
- Browser-tested a complete 10-question attempt, locked progression, score,
  explanations, retained device ID and recent-attempt history.
- Verified all anatomy chunks, mesh indices and concept-to-structure references,
  including the reduced-detail geometry.
- Browser-tested organ search, heart isolation, clear search, skeleton preset
  and region filters. WebGL was disabled in the preview browser, so visual atlas
  checks used compatibility rendering; the detailed WebGL renderer was compiled
  and its data validated but could not be visually verified in this environment.
- Mobile menu and search checked; homepage had no horizontal overflow at 320
  and 390 px frame widths. These are responsive browser checks, not a claim of
  testing every physical phone.
- Internal links and static asset destinations checked with no missing targets.
- Orange-card text contrast is 6.72:1; the main text pairs also exceed 4.5:1.
- All nine genetic crosses and the enzyme/osmosis relationships passed checks.
- ESLint passed for first-party app code. Imported atlas renderer utilities were
  excluded from style linting; TypeScript checked the entire build.

## Boundaries

Student IDs and results are on-device practice profiles, not secure online
accounts or cross-device storage. The MCQ bank develops chapter concepts into
cause, outcome, mechanism and integrated-question variants. No claim of official
past-paper provenance or external academic review is made. Existing article,
Cambridge and resource content is preserved.


This package is based on the current live GitHub source and is ready for one
Netlify deployment.

## Included refinements

- Full-card article links across the article library and related-article sections.
- Consistent hover, focus and press feedback for primary buttons, route cards,
  lesson cards, resources, Cambridge topics and navigation links.
- Animated arrows, image zoom, card lift, filter-pill feedback and mobile-menu
  transitions, with reduced-motion and touch safeguards.
- A live reading-progress bar on every long-form article.
- Contrast-corrected orange cards and controls, including readable article
  summaries, metadata, focus states and homepage track/profile sections.
- Larger recurring labels, a keyboard skip link and a useful custom 404 page.
- Correct 16:9 presentation for the featured Acellular Life lesson.
- New 1200 × 630 social-sharing card with a solid branded background.
- Optimized WebP profile portrait used throughout the site.
- Dedicated Cambridge O Level Biology 5090 page based on the official
  2026–2028 syllabus and assessment structure.
- Article search plus category, topic-group and reading-length filters.
- Automatically calculated reading times.
- Review date, syllabus alignment, article depth and recommended sources on
  every article.
- Print / Save as PDF revision-sheet mode and exam-style answer reveals.
- Unified bold page-heading typography while preserving readable serif text
  inside long-form explanations.
- Expanded About page with teaching impact and career journey.
- Correct canonical URLs, sitemap coverage and social metadata.
- Static MDCAT Practice Centre with 1,600 conceptual MCQs across 16 chapters—exactly 100 in every chapter.
- Balanced A–D answer positions, unique question IDs and explanations for every MCQ.
- Required device-based student IDs with separately stored on-device histories.
- Chapter and difficulty filters, timed attempts, instant scoring and complete
  answer review.
- Fresh question selection and reshuffled answer choices for every new attempt,
  with recent sets deprioritized to reduce back-to-back repetition.
- Forward-only quiz flow: students deliberately lock each answer before moving
  on, and locked answers cannot be revisited or edited.
- A Question of the Day that changes on Pakistan time.
- Searchable lesson library with direct-lesson and chapter-roadmap views.
- Searchable resource directory covering nineteen verified Drive categories.
- Nineteen searchable Cambridge O Level 5090 topic pages with learning anchors,
  exam skills, common mistakes and structured practice prompts.
- Structured data for the practice, video and resource pages.
- Sitemap coverage for every Cambridge topic, practice and resource route.

## Publish in one deployment

1. Extract the ZIP.
2. Open the extracted folder and select everything inside it.
3. In the GitHub repository, choose **Add file → Upload files**.
4. Upload the selected contents, not the ZIP or its outer folder.
5. Commit directly to `main` once.

Netlify will build with `npm run build:netlify` and publish the `out` folder.
