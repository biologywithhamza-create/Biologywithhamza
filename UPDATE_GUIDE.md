# Biology with Hamza — Activities and Atlas update

This ZIP contains the complete website source, including its existing articles, Cambridge pages, resources, videos, practice centre, photographs and licensed anatomy assets.

## Publish once with GitHub Desktop

1. Extract this ZIP on your computer.
2. In GitHub Desktop, open **Biologywithhamza**. Use **Current branch** to select **main**, then **Fetch origin** (and **Pull origin** if offered).
3. Choose **Repository → Show in Explorer**.
4. Copy everything inside the extracted ZIP into that repository folder. Choose **Replace the files in the destination**. The folders **app** and **public**, and files **package.json** and **netlify.toml**, belong directly at the repository root.
5. Return to GitHub Desktop. Review the changes. Enter **Expand Biology activities and improve atlas navigation** in Summary.
6. Click **Commit to main**, then **Push origin** once.
7. Check the Cloudflare Pages deployment for that commit. Wait for success, then refresh the website.

Use GitHub Desktop for this package. Do not upload the ZIP itself to the repository. Keep the repository's own .git directory.

The working static-host settings remain:

- Build command: **npm run build:netlify**
- Output directory: **out**
- Root: repository root

The script name is historical: it generates standard static files suitable for the existing Cloudflare Pages project. This update does not require a DNS change, database or new paid service.

## Included changes

- **61 activities:** 14 interactive models, 15 process builders and 32 classification challenges.
- Selected concepts across **all 16 PMDC Biology chapters**, plus four extension activities. This is broad chapter coverage, not a claim that every individual syllabus objective has a complete simulation.
- Dihybrid studio: nine possible genotypes per parent, all 81 crosses, distinct gametes, Punnett squares, genotype and phenotype probabilities, test-cross presets and randomly sampled offspring.
- Separate linkage/recombination model, plus enzyme conditions and inhibition, action potentials, sarcomeres, cardiac cycle, natural selection, thermoregulation, diffusion, photosynthesis and the original models.
- Search, chapter/type filters, paginated fully clickable activity cards, shareable activity URLs, answer explanations, reset/shuffle and reflection prompts.
- Links to related guides, the real student notes folder and preselected chapter practice.
- Activity titles included in the website search and activity URLs included in the sitemap.
- Atlas: charcoal default background and light alternative; Rotate/Move modes; directional buttons; wheel and pinch zoom; two-finger pan; keyboard arrows, +/− and Home; focus selection; fit body; larger viewer and scrollable navigation.
- Region filtering corrected in the WebGL renderer so it hides the other regions as well as updating the structure count.
- Hero text is separated from the portrait on desktop and mobile.

## Checks and practical limits

- The production static export, TypeScript check and lint checks passed.
- All 81 two-locus crosses were checked for valid probabilities; standard 9:3:3:1 and 1:1:1:1 outcomes were verified.
- All 16 compressed anatomy files passed decompression checks.
- Exported internal page and asset links were checked for missing targets.
- Desktop and phone-width previews were inspected. Chapter filters, dihybrid presets, random sampling and reset were exercised in the browser.
- The available browser used the reduced-detail compatibility atlas because WebGL was unavailable. WebGL changes passed compilation and code checks; a physical mobile pinch gesture and GPU rendering were not verified here.
- The anatomical dataset remains an adult male reference. It does not contain every human structure or female anatomy. Existing attribution and licences are included.
- Models explain selected relationships with explicit assumptions; they are not clinical tools or measured laboratory results.
- Existing 1,600 practice questions and device-local student profiles are preserved. Profiles are not online accounts with cross-device sign-in.

## Editing later

- Activity descriptions and challenges: **app/lab/activity-data.ts**
- Interactive models: **app/lab/interactive-models.tsx**
- Genetic calculations: **app/lab/models.ts**
- Activity controls and feedback: **app/lab/activity-player.tsx**
- Library search and filters: **app/lab/activity-library.tsx**
- New styling and hero spacing: **app/activity-upgrade.css**
- Atlas controls: **app/atlas/atlas-explorer.tsx**
- Atlas renderers: **app/atlas/scene.tsx** and **app/atlas/compatibility-scene.tsx**

Science checks: **node --experimental-strip-types --test tests/lab-models.test.mjs**

## Curriculum sources

The PMDC notice retains the 2025 curriculum for MDCAT 2026:
https://pmdc.pk/Documents/Others/Public%20Notice%20Regarding%20MDCAT-2026%20Date%20Announcement.pdf

Curriculum:
https://pmdc.pk/Documents/Syllabus/Uniform%20Curriculum%20MDCAT-2025%20%20Final%20(26-05-2025).pdf

Each activity links its supporting educational source. Activity questions are original teaching material, not official past-paper questions.

