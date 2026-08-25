# PYRO — Biology, MDCAT & Discovery

The official website of Hamza Ramzan: Biology lessons, MDCAT thinking, field
notes and biological discoveries.

## Netlify deployment

This repository is ready to connect directly to Netlify. Netlify reads the
included `netlify.toml` and automatically uses:

- build command: `npm run build:netlify`
- publish directory: `out`
- Node.js 22

See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) for the complete first-time
deployment and custom-domain instructions.

## Editing the website

Start with [EDITING_GUIDE.md](EDITING_GUIDE.md). The main content control file
is `app/content.ts`, which contains:

- public links;
- featured videos;
- article metadata and complete article text.

Homepage wording is in `app/page.tsx`, biography content is in
`app/about/page.tsx`, colours are at the top of `app/globals.css`, and images
are stored in `public`.

## Local commands

```bash
npm install
npm run dev:netlify
npm run build:netlify
```

The Netlify build produces a static site in `out`. The existing `npm run build`
command remains available for the original Sites deployment.
