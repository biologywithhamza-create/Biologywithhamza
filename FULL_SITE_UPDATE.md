# Biology with Hamza — v5 Learning Tools

Read START_HERE_V5.md for upload and deployment instructions. This complete source package preserves the existing website, dark/light/system themes, Human Atlas, 69 lab activities, 23 articles, 1,600-question MDCAT bank, revision dashboard, 38 Cambridge structured questions, 16 connected chapter packs and optional Supabase accounts.

## 1. Biology Mock Centre — /mocks

- Randomised 81-question Biology mocks: five questions from each of 16 chapters plus a sixth from one randomly chosen chapter.
- This is a balanced teaching mix, not an official per-chapter weighting or a complete multi-subject MDCAT paper.
- Select 60, 81 or 100 minutes. These are practice targets; the verified PMDC 2025 format has no separate prescribed Biology time.
- Locked answers and irreversible skips retain the site's requested forward-only training style. This is not a claim that an OMR exam prevents review.
- Timer uses an absolute deadline, continues while a tab is inactive and resumes on refresh. It submits on expiry; unsubmitted selections count as unanswered.
- Local session persistence, validation on restore, score breakdown by chapter, answer explanations and question-report downloads.
- Completed results feed the existing mistake notebook. Keep one active test tab; browser-clock or storage manipulation is possible, so this is not a ranked examination system.

## 2. Personal study plan — /study-today

- Saved time budget, MDCAT/Cambridge/Both track and optional student-selected exam date.
- Pakistan calendar-day countdown, with clear handling of past dates.
- Three flexible daily tasks with saved completion checkboxes.
- Weak-chapter suggestions require at least five distinct answered-or-unanswered questions in fresh/mock attempts; limited evidence is labelled explicitly.
- A 15-question daily retrieval session selects up to five due mistakes, up to five weak-chapter questions, then fills with fresh practice. Twenty-minute session cap.
- Mock attempts contribute to chapter evidence; daily mixed review and retries do not inflate that measure.
- Evidence uses the latest saved answer per distinct question in the retained last 50 attempts; this is not an exam-score prediction.

## 3. Practical and Diagram Studio — /practical-studio

Seventeen original exercises:
- Eight practical tasks: magnification, percentage mass change, mean, gas-production rate, dependent variables, systematic error, quadrat estimate and investigation planning.
- One interactive graph task with pointer placement, numeric keyboard alternatives, axes/units selection and feedback.
- Four labelled teaching schematics: neuron, nephron, plant cell and alveolus/capillary. Twenty-four structure labels total.
- Four pathway builders: blood, inspired air, filtrate-to-urine route and withdrawal reflex.

Written investigation planning uses a model method and explicit self-assessment, not automatic essay marking. Stored written responses can be restored. Diagram/route responses and graph attempts are recorded in the complete-learning backup; reopening these interactive tasks starts a new attempt. Correctly solved tasks receive completion marks; these are not mastery certifications. Diagram labels also have textual pointer descriptions.

## 4. Richer explanations

Sixteen carefully authored option-by-option explanation sets, one per MDCAT chapter, with a Roman Urdu concept summary. These appear after practice/mock submission and in downloaded packs for the relevant questions. The other bank questions retain their existing explanations. The release does not claim all 1,600 questions now have distractor-specific explanations or have received a new scientific audit.

Explanations map to the option text rather than answer letters, so shuffling cannot attach the wrong explanation to an option. Scientific terminology remains in English for exam use.

## 5. Offline study packs — /offline-packs

Sixteen downloadable, standalone HTML files generated on demand from the current chapter content. Each includes full guide text, concept-flow diagrams/tables, recall checks and all 100 chapter MCQs. Questions and options shuffle; answers lock until the review screen. There is no timer in offline mode.

No external assets or scripts are needed to read or practise inside a downloaded file. Print notes / save PDF provides a clean printable view. Offline attempts are temporary, reset on refresh and do not sync to an account. Mobile local-file support varies by browser/file viewer. Packs do not auto-update. Videos and 3D Atlas assets are excluded. This is not a service-worker PWA or app-store application.

## Integration and storage

Homepage, Practice, Cambridge practice, Revision, global search and footer expose the new learning tools. New routes are in the sitemap. Existing complete-learning backups include completed mock/daily attempts and studio/planner data via the current revision and study stores. Existing v1 backups remain accepted. Unfinished sessions are not transferred by account sync.

Optional account activation remains as documented in ACCOUNT_SETUP.md. This release has not been pushed or deployed on your behalf.

## Sources and academic scope

- PMDC 2025 final curriculum hosted by KMU: https://cat.kmu.edu.pk/sitedocuments/Uniform-Curriculum-MDCAT-2025-Final-26-05-2025.pdf
  Verified reference format: 180 total MCQs / three hours, 81 Biology questions. Confirm future-cycle notices before labelling a mock with a new exam year.
- Cambridge O Level Biology 5090, 2026–2028 syllabus: https://www.cambridgeinternational.org/Images/697330-2026-2028-syllabus.pdf
  Practical tasks are original teaching material. They are not official questions or examiner mark schemes, and do not cover every practical skill in the syllabus.
- OpenStax Biology 2e, kidneys and osmoregulation: https://openstax.org/books/biology-2e/pages/41-2-the-kidneys-and-osmoregulatory-organs

## Verification

See release-notes/V5_QA.md. Production build and all 32 automated tests pass. The earlier release notes describe historical packages; START_HERE_V5.md and this document define the current release.
