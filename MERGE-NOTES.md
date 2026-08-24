# Qyasat src merge

Base: `src(4).zip` (the version confirmed to render the English/Arabic homepage correctly).

Added back from `qyasat-src-shared-header-fixed-v3(1).zip` without replacing the working `/en` and `/ar` homepage implementations:

- Projects CMS editor at `/admin/projects`
- Authenticated projects admin API
- English and Arabic public projects pages
- Firestore/file-backed projects content store
- Projects page component and theme styling
- Shared internal-page header used by the projects pages
- Projects entry in the admin navigation
- `/projects` in the sitemap for both locales
- Global ThemeStyle injection so internal project pages inherit CMS theme changes
- Footer anchor links corrected to navigate back to the localized homepage sections from internal pages

The existing working `/en` and `/ar` homepage page files from `src(4)` were deliberately preserved.
