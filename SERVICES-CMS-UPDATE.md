# Services CMS update

The Services admin module now edits the same service cards used by the public `/ar` and `/en` homepages.

## Data flow

- `/admin/services` loads and saves through `/api/admin/services`.
- The API uses `src/lib/services-content.ts`.
- Arabic service fields are stored in `data/homepage-ar.json`.
- English service fields are stored in `data/homepage-en.json`.
- Public homepages read those same files through `getHomepageContent()`.

The previous `/api/admin/content` route remains available for older CMS modules, but the Services module no longer uses it.

## Validation

`npm run typecheck` passes.

The production build reached the Next.js font download step but could not download the Cairo Google Font in the offline validation environment. This is an environment/network limitation rather than a TypeScript error.
