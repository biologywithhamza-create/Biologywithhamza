# Biology with Hamza — refinement release

This package is based on the current live GitHub source and is ready for one
Netlify deployment.

## Included refinements

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

## Publish in one deployment

1. Extract the ZIP.
2. Open the extracted folder and select everything inside it.
3. In the GitHub repository, choose **Add file → Upload files**.
4. Upload the selected contents, not the ZIP or its outer folder.
5. Commit directly to `main` once.

Netlify will build with `npm run build:netlify` and publish the `out` folder.
