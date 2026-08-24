# SEO CMS update

The SEO module now uses `/api/admin/seo` and stores records in Firestore collection `seo_pages` when Firebase Admin is configured. Without Firebase, it falls back to `storage/private/seo-pages.json` for local development.

Managed pages:
- Arabic and English homepage
- Arabic and English services page
- Arabic and English blog listing
- Arabic and English contact page

The CMS controls title, description, keywords, canonical URL, Open Graph title/description/image, robots directives, activation status, and optional JSON-LD schema. It includes Google and social-sharing previews.

The public routes read the same SEO source through Next.js metadata functions. Blog articles continue to use their own SEO title, SEO description, and social image fields.

Also included:
- `/robots.txt`
- `/sitemap.xml`, including published blog posts
- Canonical and alternate-language URLs
- Twitter/X summary card metadata

Set `NEXT_PUBLIC_SITE_URL=https://qyasat.sa` in production.
