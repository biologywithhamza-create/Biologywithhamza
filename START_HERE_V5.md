# Biology with Hamza — v5 Learning Tools

Release: 6 October 2026. This is a complete source package, including the v4 Cambridge practice, chapter packs and optional account code.

## Check you have the right download

The archive is named `Biology-with-Hamza-2026-10-06-Learning-Tools-v5.zip`.
Its root includes this file, `ACCOUNT_SETUP.md`, `supabase/`, `app/mocks/`, `app/study-today/`, `app/practical-studio/` and `app/offline-packs/`.

## Upload once using GitHub Desktop

1. Extract the ZIP into a new folder.
2. In GitHub Desktop, select Biologywithhamza and main. Fetch/Pull any existing remote changes first.
3. Choose Repository → Show in Explorer.
4. Copy the contents of the extracted package into that repository folder and replace matching files. Keep your existing Git metadata. Do not copy the ZIP or an enclosing folder into the repository.
5. Review the changed files and commit with: `Add Biology mocks, study planner, practical studio and offline packs`.
6. Click Push origin. Your connected Cloudflare Pages project should build the commit.

Cloudflare build command: `npm run build:netlify`
Build output directory: `out`
The script retains its historical name and produces a static website compatible with Cloudflare Pages. No domain changes are needed.

## Check the deployed routes

- `/mocks/`: create/use a local Practice ID, start a mock, lock an answer, refresh and check that the timer and next question resume.
- `/study-today/`: set a track, time budget and optional personal exam date; save and reload.
- `/practical-studio/`: try calculations, the graph, diagram labels and pathway ordering.
- `/offline-packs/`: download a chapter HTML file, then open it with internet disconnected in a browser that supports local HTML scripts.

## Accounts

Online sign-in remains optional and needs the one-time setup in ACCOUNT_SETUP.md. This update does not provision a Supabase project or an email sender. Completed mock and daily attempts, study targets and studio records are included in the existing complete-learning backup/manual account sync. Unfinished mocks remain device-local. Offline HTML quiz results are temporary and separate.

No public ranking, teacher administration portal, payment processing or Google sign-in is introduced in this release. Scores are personal practice feedback, not verified competition scores.
