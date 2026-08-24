# Firebase Production Update

This version replaces production writes to local JSON files with persistent Firebase services.

## Migrated to Firestore

- Homepage content (Arabic and English)
- General CMS content and tracking/pixel settings
- Site settings and branding
- Theme and footer colors
- Site text dictionary
- Blog posts
- SEO pages
- Contact messages
- First-party analytics events
- Message Writer history

## Migrated to Firebase Storage

- Logos
- Homepage media
- Service media
- Blog media
- OG images
- Miscellaneous uploads

Local JSON remains only as a development fallback when Firebase is not configured. Production media writes fail clearly if Firebase Storage is missing instead of silently writing to Vercel's temporary filesystem.
