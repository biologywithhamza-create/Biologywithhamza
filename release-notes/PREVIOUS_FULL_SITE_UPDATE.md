# Biology with Hamza — full-site update

This ZIP contains the complete source site for the existing GitHub repository. It includes the previous atlas upgrade and the new site-wide changes below. It is not an atlas-only patch. Nothing has been pushed or deployed for you.

## What changed in this update

- Homepage: separate text and portrait areas keep “Stay curious” visible; clearer portrait-caption contrast; a chapter selector and four learning entry cards.
- Shared interaction: hover/press feedback, visible keyboard focus, reduced-motion support, and white text on the dark orange article cards.
- Learning workspace: /learn connects 16 MDCAT chapter routes and the existing 19 Cambridge topic routes. Search chapters, filter by completion and keep a saved reading list.
- Study tools: completion markers, bookmarks and personal notes on articles, activities, Cambridge topics, chapters and video lessons. Export/import progress as JSON, plus a simple daily study-time planner.
- Articles: pagination, sorting, saved-only filtering, eight additional worked-reasoning sections with three extra questions each, and a new respiratory physiology guide. There are 23 guides total. Reading times remain calculated from content.
- Lab: eight new interactive models, taking the library from 61 to 69 activities (22 models, with the existing sequence and sorting activities retained). New models cover ventilation, diffusion at respiratory surfaces, renal water balance, immune memory, the complete standard RNA codon table, PCR, food tests and water potential. Existing dihybrid and linkage studios remain included.
- Practice: prioritises different concept families before repeating related variants; retains option shuffling and forward-only locked answers. Results offer an incorrect/unanswered filter, retry of missed questions and chapter learning links.
- Question files: public/question-banks contains 16 chapter JSON files, each with 100 questions, options, correct-answer index and explanation. These export the existing 1,600-item bank; they are not 1,600 newly authored independent concepts. Related concept variants are explicitly identified as a limitation.
- Videos: an on-page YouTube player for the three verified lessons, saved notes, and chapter cards leading to learning routes instead of all opening the same playlist.
- Resources: the three exam-guide cards now open their actual guides; lecture-note cards retain the real shared Drive folder rather than guessed file links.
- Discovery: new routes appear in the sitemap and site search; the Learn navigation opens the learning workspace. Updated content is labelled “Content updated” rather than claiming an unperformed teacher review.

## Preserved

Biology with Hamza branding, original portrait, correct first YouTube lesson, social/Drive links, Cambridge positioning, user-supplied career metrics, About page, previous anatomy models, anatomy licences/attribution, atlas navigation/background/layer controls and kidney teaching details.

## Scope and practical limits

- Student IDs and learning progress are local to a browser. This package does not add password-based accounts, a database or automatic cross-device synchronisation. Use progress export/import to move learning notes and completion markers; quiz history is separate.
- Static question files expose answers and are appropriate for practice, not secure proctored assessment.
- The activities cover selected concepts across all 16 chapters, not every individual syllabus objective. Models state their simplifications.
- Eight existing articles were expanded; the remaining articles were retained, not all rewritten to a fixed word count.
- Individual Drive file access and additional video identities were not available for reliable indexing, so no file URLs, lessons, testimonials or results were invented.
- Anatomy is an educational reference, not a complete clinical dissection system or a simulation of every organ's physiology.
- Responsive breakpoints are implemented. Full real-device, assistive-technology and every WebGL hardware combination testing was not performed. Embedded YouTube playback depends on YouTube and network access.

## Upload once using GitHub Desktop

1. Extract this ZIP.
2. In GitHub Desktop, open Biologywithhamza, select main, and fetch/pull the latest changes.
3. Choose Repository → Show in Explorer.
4. Copy the extracted contents into that repository folder. Replace matching files. Do not copy the outer ZIP folder and do not delete the repository's Git metadata.
5. Review Changes. Commit with: `Upgrade learning workspace, labs, quizzes and site UI`.
6. Click Push origin once.

Keep the existing Cloudflare Pages Git connection. The tested static build command is `npm run build:netlify` and the output directory is `out`; the command name also works for Cloudflare Pages. No DNS changes are required for this source update.

## Validation

The production static build and TypeScript compilation pass. Automated checks cover 100 valid questions per chapter, unique IDs and stems, answer preservation during option shuffling, concept-family diversity in short attempts, all chapter-guide/activity connections, unique activity routes, exported internal destinations, and Mendelian model benchmarks. See tests/full-site-upgrade.test.mjs and tests/lab-models.test.mjs.

To regenerate downloadable banks after editing questions: `node scripts/export-question-banks.mjs`.
