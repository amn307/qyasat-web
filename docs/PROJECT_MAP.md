# Qyasat CMS — Project Map

## Project Goal

Qyasat CMS is not a simple company website. It is a controlled digital platform for قياسات with:

- Public bilingual website
- Admin dashboard
- Full content management
- Theme and style control
- Media manager
- Contact CRM
- Blog system
- SEO and pixel manager
- Writing assistant for replies and content
- Future AI and Firestore integration

---

## Current Stack

- Next.js
- TypeScript
- Tailwind CSS
- Local JSON storage currently
- Server media storage
- Future Firestore migration
- Apache reverse proxy
- systemd service: qyasat-cms
- Port: 127.0.0.1:7777
- Domain: qyasat.sa

---

## Public Website

### Existing
- `/ar`
- `/en`
- `/ar/services`
- `/en/services`
- `/ar/contact`
- `/en/contact`

### Required
- Strong UI/UX redesign
- About page
- Blog listing
- Blog details
- Case studies
- FAQ
- Landing pages
- Dynamic sections
- Full text control from admin
- Full SEO control
- Responsive mobile-first design

---

## Admin Dashboard

### Existing
- `/admin`
- `/admin/login`
- `/admin/theme`
- `/admin/settings`
- `/admin/home`
- `/admin/services`
- `/admin/media`
- `/admin/seo`
- `/admin/pixels`
- `/admin/messages`
- `/admin/account`

### Required
- Better dashboard UI
- Roadmap page
- Blog manager
- Pages manager
- Section builder
- Writing assistant
- Better CRM
- Activity log
- Backup/export
- Real authentication hardening

---

## Content Management

### Existing
- Home content
- Services content
- SEO content
- Settings
- Pixels

### Required
- Every public text editable
- Header text
- Footer text
- CTA text
- Contact page text
- Services page headings
- Blog page headings
- Dynamic pages
- Show/hide sections
- Sort sections
- Reusable blocks

---

## Blog System

### Required Routes
- `/ar/blog`
- `/en/blog`
- `/ar/blog/[slug]`
- `/en/blog/[slug]`
- `/admin/blog`

### Blog Fields
- title ar/en
- slug
- excerpt ar/en
- body ar/en
- cover image
- status: draft/published
- category
- tags
- author
- SEO title
- SEO description
- OG image
- published date

---

## Messages CRM

### Existing
- Contact form
- Messages storage
- Admin messages page
- Status
- Priority
- Internal notes

### Required
- Reply writer
- Reply templates
- Copy reply
- Message summary
- Client need extraction
- Lead quality
- Follow-up date
- Email/WhatsApp sending later

---

## Writing Assistant

### Phase 1
Template-based assistant:
- Professional reply
- Short reply
- Sales reply
- Follow-up reply
- Arabic/English

### Phase 2
AI-powered assistant:
- Generate reply
- Improve tone
- Summarize client message
- Extract project requirements
- Draft blog posts
- Draft service copy

---

## Media Manager

### Existing
- Upload
- List
- Delete
- Copy URL
- Public `/media/...`

### Required
- Media picker everywhere
- Image optimization
- Alt text
- Categories
- Used-in references
- Blog cover image
- Service images
- Hero image
- OG image

---

## Theme System

### Existing
- Colors
- Typography
- Radius
- Basic presets

### Required
- Header style
- Footer style
- Button styles
- Card styles
- Background style
- Hero layout variants
- Section spacing
- Dark/light/custom
- Preview before save

---

## SEO

### Existing
- Basic dynamic metadata
- Pixel manager

### Required
- Sitemap
- Robots
- Schema
- Per-page SEO
- Per-blog SEO
- OG previews
- Canonical URLs
- Arabic/English hreflang

---

## Execution Phases

### Phase 1 — Stabilize Admin Foundation
- Admin login username/password
- Roadmap
- Dashboard UI
- Media picker
- Settings
- Account page

### Phase 2 — Full Content Control
- Header/Footer content
- Contact page content
- Services page content
- Dynamic home sections
- Section visibility/sorting

### Phase 3 — Blog
- Blog storage
- Admin blog CRUD
- Public blog pages
- Blog SEO

### Phase 4 — Messages CRM + Writer
- Message details
- Reply assistant
- Templates
- Follow-up workflow

### Phase 5 — UI/UX Redesign
- Public website redesign
- Admin redesign
- Mobile polish
- Animations
- Better visual hierarchy

### Phase 6 — SEO / Production
- Sitemap
- Robots
- Schema
- Backups
- Security hardening
- Firestore migration
