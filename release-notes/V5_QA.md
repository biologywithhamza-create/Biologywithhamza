# v5 verification — 6 October 2026

## Production checks

- `npm run test:static`: passed.
- Next static export generated 165 entries.
- 32 automated tests passed, including 8 new release tests.
- ESLint for new application files: no errors or warnings (npm emitted an unrelated environment configuration notice).

New automated coverage: 81 distinct questions and chapter allocation; shuffled correct-answer preservation; irreversible answer locks and skips; deadline expiry; saved-session rejection for altered questions/answers; due-item inclusion and unique daily sets; mock evidence versus daily/retry exclusion; Pakistan-date countdown; complete option-explanation mapping across 16 chapters; all 16 self-contained offline packs and escaping; numerical practical keys and graph validation.

## Browser workflows

Chromium desktop 1440px and mobile 390px:

- Profile gate on mock centre.
- Start mock, lock answer, refresh and resume at the next question.
- Deadline expiry submits and counts remaining questions as unanswered.
- Mock and completed 15-question daily session stored in revision history.
- Planner track, time, date and completion persisted across reload.
- Empty numerical submission disabled; incorrect and correct feedback checked.
- Graph axes and all four coordinate pairs checked.
- All four diagrams accept their correct six labels.
- Blood route builder accepts all nine correctly ordered stages.
- One actual downloaded HTML pack was opened as a local file with networking disabled; quiz start, answer lock, skips, results and print styling passed.
- All four new routes checked for horizontal overflow at desktop/mobile widths in light/dark themes; none found.
- No page JavaScript errors during these workflows.
- Selected desktop and mobile screenshots visually inspected.

## Boundaries

The tests do not establish psychometric validity, official exam equivalence or production email deliverability. No live account credentials were used and no deployment was made. Offline packs use original existing notes and question data; only the 16 enhanced explanation sets received new option-by-option content in this release. Mobile operating-system support for opening local HTML files varies.
