# Rebuilding atlas additions
The website already includes compressed anatomy assets; hosting does not need Blender, NumPy or any source downloads.

These scripts document development conversion of the Z-Anatomy Startup.blend file. The Blender reader resolves DATA pointers within each owning ID block, preserving source object matrices. export_z.py uses NumPy, reads the original atlas catalogue to avoid duplicates, exports mesh geometry and swept Bezier curves, and mirrors the source half pharyngeal regions/cauda equina. Run from a development directory containing restored/public/atlas/models/atlas.json and pass the source .blend path. Then run upgrade-atlas-models.mjs from the website root with the additions JSON and BodyParts3D spinal-cord OBJ paths. Run this only against the original atlas catalogue, then regenerate compatibility geometry.

Do not include noncommercial kidney/inner-ear source additions. See public/atlas/ATTRIBUTION.md for all credits, adaptations and scope.
