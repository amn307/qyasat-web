# Qyasat CMS — Vercel Production Setup

This build stores CMS data in **Cloud Firestore** and media in **Firebase Storage**. It no longer depends on Vercel's temporary filesystem for production data.

## 1. Create Firebase resources

1. Create or select a Firebase project.
2. Enable **Cloud Firestore** in production mode.
3. Enable **Firebase Storage**.
4. In Firebase Console → Project settings → Service accounts, generate a new private key.

## 2. Add Vercel environment variables

In Vercel → Project → Settings → Environment Variables, add all values from `.env.example` for **Production**, **Preview**, and **Development** as needed.

Required:

- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_STORAGE_BUCKET`

For `FIREBASE_PRIVATE_KEY`, paste the complete key. Vercel may store it with real line breaks or escaped `\n`; both are supported.

## 3. Deploy

After adding variables, trigger a fresh deployment. Existing deployments do not receive newly added variables automatically.

## 4. Verify

Open:

`https://your-domain.com/api/health`

A production-ready response has:

- `ok: true`
- `services.firestore: true`
- `services.storage: true`
- `services.adminConfigured: true`

## 5. Data locations

- Homepage, settings, theme, site texts, tracking settings and message-writer drafts: `cms_documents`
- Blog posts: `blog_posts`
- SEO pages: `seo_pages`
- Contact submissions: `contact_messages`
- First-party analytics: `analytics_events`
- Uploaded files: Firebase Storage under `media/`

## Important

The Admin Account screen cannot change Vercel environment variables. In production, update admin credentials from the Vercel dashboard and redeploy.

## Private key build error on Vercel

If Vercel reports `DECODER routines::unsupported` or `Failed to parse private key`, the value in `FIREBASE_PRIVATE_KEY` is malformed.

Use the exact `private_key` value from the Firebase service-account JSON. In Vercel, paste the entire key including the BEGIN/END lines. The application accepts either real line breaks, escaped `\n` line breaks, or a base64-encoded PEM value.

Do not paste the complete service-account JSON into `FIREBASE_PRIVATE_KEY`, and do not use the Firebase Web API key.

After correcting the variable, redeploy and open `/api/health`. It will report a readable `firebaseConfigurationError` when the variables are still invalid.
