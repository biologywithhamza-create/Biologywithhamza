# Human Atlas update

This is the complete Biology with Hamza website source, including the existing activities, quizzes, articles, resources and Cambridge guides.

## What changed
- Actual spinal-cord tissue and 240 additional peripheral nerve/plexus objects.
- All five lung lobes, with access to the separate airway tree.
- Three pharyngeal regions to explain the oral/nasal-to-throat connection.
- 127 regional lymph-node groups and 16 explicitly illustrative major drainage routes.
- 366 additional connective-tissue structures, including fascia, ligaments, menisci and intervertebral discs.
- One-system selector, focused shortcuts, per-structure hiding and restore controls.
- Interactive kidney cutaway with layers, labels, nephron pathway and concept checks.
- Shared system classification for structures relevant to more than one system.
- Improved small nasal-bone detail in the compatibility renderer; normal nasal structures are identified and retained.

## Upload with GitHub Desktop
1. Select the Biologywithhamza repository and its production branch (normally main).
2. Repository → Show in Explorer.
3. Extract this ZIP and copy its contents into that repository folder. Replace matching files.
4. In GitHub Desktop, review the changes. Commit summary: Improve Human Atlas anatomy and kidney explorer.
5. Commit, then Push origin.

Do not copy dependency folders or build output from other working folders. They are not included in this package. Do not delete the repository folder itself.

## Hosting
Keep the existing Cloudflare Pages build command: npm run build:netlify. Output directory: out. The script name is retained for compatibility and produces ordinary static files supported by Cloudflare Pages.

## Scope
The 3D atlas now contains 2,992 selectable objects, including 16 labelled teaching routes. It is not a complete clinical atlas. The kidney cutaway is a simplified teaching diagram, not actual sectioning of the 3D model. Fine lymphatic vessels and microscopic nerve branches remain outside the reference dataset. Attribution and sources are in public/atlas/ATTRIBUTION.md.

## Validation
- Production command `npm run build:netlify` generated all 116 static routes.
- TypeScript and targeted ESLint checks passed.
- Binary mesh bounds, indices, offsets, concept references and compatibility assets validated for all 2,992 objects.
- Browser checked: kidney selection, nephron steps, switching to 3D, respiratory/nervous/lymphatic views, hide and restore.
- This preview browser used the compatibility renderer because WebGL was unavailable; hardware WebGL rendering and a physical mobile device were not visually tested. Responsive CSS and the shared rendering visibility logic are included.
