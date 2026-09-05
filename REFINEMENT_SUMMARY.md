# Biology with Hamza — student platform release

This package is based on the current live GitHub source and is ready for one
Netlify deployment.

## Included refinements

- Full-card article links across the article library and related-article sections.
- Consistent hover, focus and press feedback for primary buttons, route cards,
  lesson cards, resources, Cambridge topics and navigation links.
- Animated arrows, image zoom, card lift, filter-pill feedback and mobile-menu
  transitions, with reduced-motion and touch safeguards.
- A live reading-progress bar on every long-form article.
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
- Chapter and difficulty filters, timed attempts, instant scoring, complete
  answer review and private on-device attempt history.
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
