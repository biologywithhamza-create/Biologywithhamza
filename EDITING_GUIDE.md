# Editing the Biology with Hamza website

After the project is on GitHub, open the relevant file, select the pencil icon,
make the edit, and choose **Commit changes**. Netlify then publishes that commit.
To conserve Netlify credits, collect several edits and commit them together.

## Quick editing map

| What you want to change | File to open |
| --- | --- |
| YouTube, Drive, Instagram, WhatsApp, Nearpeer, or LinkedIn links | `app/content.ts` → `links` |
| Featured videos and thumbnails | `app/content.ts` → `videos` |
| Article titles, categories, descriptions, diagrams, tables, and text | `app/article-data.ts` → `articles` |
| Homepage headline, statistics, and section wording | `app/page.tsx` |
| Biography, qualifications, experience, and awards | `app/about/page.tsx` |
| Website title and search description | `app/layout.tsx` |
| Colours and layout | `app/globals.css` |
| Profile picture | Replace `public/hamza-ramzan.png` |
| Browser icon | Replace `public/favicon.svg` |

## Change a link

Open `app/content.ts`. Near the top you will see:

```ts
export const links = {
  youtube: "https://www.youtube.com/...",
  studentDrive: "https://drive.google.com/drive/folders/...",
  instagram: "https://www.instagram.com/...",
  whatsapp: "https://whatsapp.com/channel/...",
};
```

Replace only the address between quotation marks. Keep the quotation marks,
comma, and property name unchanged.

## Add or replace a video

1. Put the thumbnail in `public`, for example `public/video-homeostasis.jpg`.
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

The image path starts with `/` even though the file is stored in `public`.

## Add a new article

Open `app/article-data.ts`, find `export const articles`, and copy one complete
article object. Then change:

- `slug`: a unique lowercase address using hyphens;
- `category`: `MDCAT`, `Cambridge O Level`, `Learn Biology`, or `Study Strategy`;
- `title`, `description`, `readTime`, `date`, and `dateISO`;
- `objectives`, every item inside `sections`, `recap`, and `conceptChecks`;
- optional `diagram`, `table`, or `callout` content.

The article listing, search filters, article page, contents menu, and related
articles are generated automatically. Never use the same slug twice.

## Change the homepage statistics

Open `app/page.tsx` and search for `proof-strip`. Update the number inside
`<strong>` and its explanation inside `<span>`. Keep the HTML tags intact.

## Change the profile picture

Prepare a transparent PNG portrait named exactly `hamza-ramzan.png`. Upload it
into `public` and replace the existing file. The same image is used throughout
the website.

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

Change the hexadecimal value after the variable name, but do not rename the
variable.

## Publish several edits in one Netlify deployment

1. Make all desired edits in GitHub before committing.
2. Choose **Commit changes** once after the complete batch is ready.
3. Netlify sees the single commit and starts one production deployment.
4. Check the live homepage, one article, one video link, and the mobile layout.

## Safe editing rules

1. Change text between quotation marks, not the surrounding code.
2. Preserve commas, brackets, braces, quotation marks, and property names.
3. Use one final commit for a batch of related updates.
4. If a deployment fails, open the Netlify deploy log. The previous successful
   deployment remains available and can be restored.

Ask for help when adding new page layouts, forms, quizzes, payments, accounts,
or a content-management system.
