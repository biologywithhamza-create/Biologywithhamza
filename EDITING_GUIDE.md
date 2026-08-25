# Editing the PYRO website

You do not need specialist software for routine changes. After the project is
on GitHub, open the relevant file, select the pencil icon, make the edit, and
choose **Commit changes**. Netlify will publish the update automatically.

## Quick editing map

| What you want to change | File to open |
| --- | --- |
| YouTube, Instagram, WhatsApp, Nearpeer or LinkedIn links | `app/content.ts` → `links` |
| Featured videos and their thumbnails | `app/content.ts` → `videos` |
| Article titles, dates, descriptions and complete article text | `app/content.ts` → `articles` |
| Homepage headline, introduction and section wording | `app/page.tsx` |
| Biography, qualifications, experience and awards | `app/about/page.tsx` |
| Website title and search description | `app/layout.tsx` |
| Colours | `app/globals.css` → the variables at the top |
| Profile picture | Replace `public/hamza-ramzan.png` |
| Social-sharing image | Replace `public/og.png` with a 1200×630 image |
| Browser icon | Replace `public/favicon.svg` |

## Change a link

Open `app/content.ts`. At the top you will see:

```ts
export const links = {
  youtube: "https://www.youtube.com/...",
  instagram: "https://www.instagram.com/...",
  whatsapp: "https://whatsapp.com/channel/...",
};
```

Replace only the address between quotation marks. Keep the quotation marks,
comma, and property name unchanged.

## Add or replace a video

1. Save the thumbnail inside the `public` folder, for example
   `public/video-homeostasis.jpg`.
2. Open `app/content.ts` and find `export const videos`.
3. Replace one video object or copy an existing object:

```ts
{
  title: "Homeostasis — Complete Revision",
  label: "MDCAT · Revision",
  href: "https://www.youtube.com/watch?v=VIDEO_ID",
  image: "/video-homeostasis.jpg",
},
```

The image path begins with `/` even though the file is stored inside `public`.

## Add a new article

Open `app/content.ts`, find `export const articles`, and copy one complete
article object. Then change:

- `slug`: a unique lowercase address using hyphens, such as
  `how-enzymes-reduce-activation-energy`;
- `category`: `MDCAT`, `Learn Biology`, or `Study Strategy`;
- `date` and `dateISO`;
- `title`, `description`, and `readTime`;
- every heading, paragraph, point, and callout inside `sections`.

The article listing and article page are generated automatically. Do not use
the same slug twice.

## Change the profile picture

Prepare a transparent PNG portrait and rename it exactly:

`hamza-ramzan.png`

Upload it into `public` and replace the existing file. Keeping the same filename
updates the homepage, About page, and article author image together.

## Change the colours

Open `app/globals.css`. The first section contains the colour system:

```css
:root {
  --navy: #071018;
  --paper: #f4f0e6;
  --sage: #cbd7bf;
  --green: #35b86b;
  --ember: #f06c32;
}
```

Change the hexadecimal value after the variable name. Avoid renaming the
variables because they are used throughout the design.

## Safe editing rules

1. Change text between quotation marks, not the surrounding code.
2. Preserve commas, brackets, braces, and quotation marks.
3. Make one type of change at a time and wait for Netlify to finish deploying.
4. Check the live page on desktop and mobile after every important edit.
5. If a deployment fails, open Netlify's deploy log. The last working version
   remains live, and the unsuccessful change can be corrected or reverted.

## When to ask for help

Routine text, link, image, video and article changes are safe to make manually.
Ask for help when adding new page layouts, forms, search, a content-management
system, animations, quizzes, payments, or a major visual redesign.
