# Anatomy data attribution

BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.

- License: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html (updated 2025-02-27)
- Dataset: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- License terms: https://creativecommons.org/licenses/by/4.0/
- Source geometry: `isa_BP3D_4.0_obj_99.zip`, BodyParts3D 4.0.
- English names and relationships: IS-A and PART-OF concept, element, and inclusion tables from the same archive.
- Publication: Mitsuhashi et al. (2009), BodyParts3D: 3D structure database for anatomical concepts. https://doi.org/10.1093/nar/gkn613

Adaptations: axes and units converted from millimeters/Z-up to meters/Y-up; translated to rest at the stage; geometry simplified using meshoptimizer with 0.2% relative error limit per structure; normals quantized to signed 16-bit; packed into binary chunks; curated display system groupings and colors. The source contains 2,234 individual OBJ meshes; all remain represented. The combined hierarchy contains 3,432 named FMA concepts, which may reference multiple meshes. Original source identity is preserved in the manifest.

Source OBJ comments mention an older CC BY-SA 2.1 Japan license. The official current database license linked above supersedes that legacy text and explicitly permits redistribution and adaptation under CC BY 4.0.

BodyParts3D represents an adult male reference anatomy based on TARO MRI and anatomical illustration refinements. It is not a complete model of every possible human anatomical structure or variation. This interface is educational and is not a clinical tool.

## Historical assets (not included in the current release)

Earlier repository revisions included female reference anatomy: Kristen Browne and Heidi Schlehlein, Human Reference Atlas / HuBMAP, *3D Reference Organ Set for Female v1.5* (2023). CC BY 4.0. Geometry adapted for this viewer.

- Source DOI: https://doi.org/10.48539/HBM352.BTSQ.586
- Dataset: https://lod.humanatlas.io/ref-organ/united-female/v1.5
- Original GLB: https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.5/assets/3d-vh-f-united.glb
- License: https://creativecommons.org/licenses/by/4.0/

Adaptations: translated native meter/Y-up coordinates onto the stage, coincident vertices welded and source normals averaged, geometry simplified with a 0.2% per-structure relative error bound, and normals quantized. Colors and display systems are curated for this interface. All 888 source meshes are represented, with 1,073 source nodes available as selectable individual or compound concepts.

This is a reference assembly with whole-body surface and selected organs, including female reproductive anatomy. Its skeleton and muscle coverage is partial. It is not a complete model of every human structure or a single-person scan. Eight placenta/umbilical structures are classified under Pregnancy reference and hidden by default.

## Biology with Hamza integration

Viewer engine adapted from https://github.com/ashemag/human-atlas (MIT, copyright 2026 ashemag). Original license: licenses/HUMAN-ATLAS-MIT.txt. Changes: new website UI; region filters; keyboard-accessible view and zoom controls; independent canvas fitting; gzip-only distribution with decoder fallback. Geometry is unchanged from the compressed upstream release.

Compatibility view: geometry reduced using meshoptimizer with a 2.5% per-mesh relative error bound; quantized to 0.01 mm coordinate precision and displayed with a custom Canvas 2D software renderer. All source structure identities are retained. Fine anatomical detail is reduced.


## September 2026 anatomy expansion

Additional peripheral nerves, lung lobes, pharyngeal regions, lymph-node groups, fascia, ligaments, menisci and discs are adapted from [Z-Anatomy](https://github.com/Z-Anatomy/Models-of-human-anatomy), by Gauthier Kervyn and contributors, derived from BodyParts3D by the Database Center for Life Science (Kousaku Okubo). Z-Anatomy geometry and our adaptations are licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The source also credits cranial-nerve reference anatomy to the University of Dundee, CAHID (CC BY 4.0).

Adaptations: selected mesh and curve extraction, world transformations, source symmetry for pharyngeal regions and cauda equina, alignment to the existing body, triangulation, normal generation, geometry simplification, new labels, grouping and compressed web delivery. The source inner-ear and kidney additions with noncommercial licenses are excluded. No source definitions or brain additions were copied.

The added spinal cord is BodyParts3D 4.3 neural tissue of spinal cord, FJ4426/FMA242005, obtained from the [BodyParts3D mirror](https://github.com/olivercase/body_parts_3d_api). Credit: DBCLS, BodyParts3D. The mirror retains the original CC BY-SA 2.1 Japan attribution; see the [current DBCLS license](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html).

The atlas catalogue, adapted anatomy-upgrade geometry and combined compatibility geometry are distributed under CC BY-SA 4.0. Existing source licenses remain applicable.

### Teaching illustrations and limits

Sixteen major lymphatic drainage paths (TEACH-* IDs) are original simplified teaching geometry, not traced reference vessels. They illustrate drainage from body regions towards the venous angles and do not represent every vessel, valve or node connection. These illustrations are also CC BY-SA 4.0.

The interactive kidney cutaway and nephron pathway are original SVG teaching illustrations. They are deliberately separate from the 3D kidney surface. They are not a volumetric dissection or a microscopic reconstruction. Educational references: OpenStax Anatomy and Physiology 2e, sections 25.3–25.4.

This is an adult male reference assembly, not an individual clinical scan or complete anatomical inventory. The source meshes differ slightly in pose; fine spatial relationships and small branches are simplified. A node-group model may contain multiple individual nodes. Normal nasal bones, the vomer and conchae are retained and explained rather than removing normal anatomy.
