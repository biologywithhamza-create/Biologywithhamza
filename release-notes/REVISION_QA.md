# Revision release verification

Verified 2026-10-02 against the local production export.

- Exact build command: npm run build:netlify. Passed; 143 generated entries.
- TypeScript check passed with tsconfig.netlify.json.
- ESLint passed for changed application files.
- 18 automated tests passed across content/links, lab models, appearance and revision logic.
- Browser walkthrough passed: create ID; complete a fresh 10-question attempt; persist all misses; immediate retry without changing due dates; simulate due timestamps and complete scheduled review; verify interval advances; notebook pagination; report download; export and restore revision backup; refresh attempt history.
- Revision overview/notebook/history checked at 1440px and 390px, in light and dark modes. No horizontal page overflow and no JavaScript page errors in the walkthrough.
- Screenshots: revision-desktop.png and revision-mobile-dark.png.

The checks establish application behavior and data integrity. They do not replace an independent subject-specialist review of the entire question bank or testing on every physical device.
