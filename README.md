# Biology with Hamza

The official teaching website of Hamza Ramzan, with concept-driven Biology for
MDCAT and Cambridge O Level learners, a 64-question practice centre, searchable
article and lesson libraries, nineteen Cambridge 5090 topic routes, and an
organized student-resource directory.

## Netlify deployment

This repository is ready to connect directly to Netlify. The included
`netlify.toml` automatically uses:

- build command: `npm run build:netlify`
- publish directory: `out`
- Node.js 22

See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) for first-time deployment,
GitHub updates, and custom-domain instructions.

## Editing the website

Start with [EDITING_GUIDE.md](EDITING_GUIDE.md). The main editing files are:

- `app/content.ts` — public links and featured videos;
- `app/article-data.ts` — article titles, metadata, diagrams, tables, and text;
- `app/page.tsx` — homepage wording and sections;
- `app/about/page.tsx` — biography and teaching profile;
- `app/cambridge-o-level/page.tsx` — Cambridge 5090 syllabus and skills route;
- `app/cambridge-o-level/topics.ts` — all nineteen Cambridge topic routes;
- `app/practice/questions.ts` — MDCAT questions, answers and explanations;
- `app/resources/resources.ts` — searchable student-resource directory;
- `app/globals.css` — colours, typography, and layout;
- `public` — profile photo, thumbnails, and browser icon.

## Local commands

```bash
npm install
npm run dev:netlify
npm run build:netlify
```

The Netlify build produces the static website in `out`. The existing
`npm run build` command remains available for the original Sites environment.
