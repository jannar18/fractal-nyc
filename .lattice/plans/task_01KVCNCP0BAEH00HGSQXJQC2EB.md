# FRAC-228 — Rename pages to match website labels (incl. URLs)

Map: Neighborhood→Visit, LiberalArts→Education, Lab→Publications.

## Scope (user chose "Everything incl URLs")
Rename all user/developer-facing layers + add redirects:
- Page files+symbols: NeighborhoodPage→VisitPage, LiberalArtsPage→EducationPage, LabPage→PublicationsPage
- Section: components/sections/LiberalArts.tsx→Education.tsx (symbol LiberalArts→Education)
- Dir: components/lab/ → components/publications/
- Data: data/lab-documents.ts→publications-documents.ts, lab-tags.ts→publications-tags.ts;
  symbols LabDocument→PublicationDocument, LAB_DOCUMENTS→PUBLICATION_DOCUMENTS
- Routes/slugs (houses.ts + App.tsx): /neighborhood→/visit, /new-liberal-arts→/education, /lab→/publications
- Redirects: old routes → new via wouter <Redirect> (preserve bookmarks)
- Update Navbar hrefs, heroNavNodes routes, use-global-search/use-archive-filter, all imports, tests

## Out of scope (deliberate)
- House internal `id` (neighborhood/school/lab) — abstract key like forum→Political Club,
  woven into token-sync test (derives slug from displayName, NOT id) + OctahedronHero BANNER_BY_ID.
- Octahedron face .webp filenames (keyed by stable id) + CSS --color-house-* tokens
  (already display-named; sync test passes unchanged).

## Acceptance
typecheck + test + build all green; old URLs redirect to new; navbar/hero/search use new routes.
