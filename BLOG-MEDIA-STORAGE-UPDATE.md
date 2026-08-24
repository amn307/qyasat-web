# Blog and Media Storage

## Production storage

- Blog posts are stored in Firestore collection: `blog_posts`.
- Uploaded media is stored in Firebase Storage under: `media/<folder>/<file>`.
- Published posts are displayed automatically on `/en`, `/ar`, `/en/blog`, `/ar/blog`, and their article pages.
- Draft posts remain visible only in the admin dashboard.

## Required environment variables

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
```

The exact bucket name is shown in Firebase Console > Storage.

## Local development fallback

When Firebase Admin variables are absent:

- Blog posts use `storage/private/blog-posts.json`.
- Media files use `storage/uploads/`.

This fallback is useful locally but should not be relied on for serverless production hosting because local files may be temporary.

## Homepage behavior

The homepage loads the newest three posts whose status is `published`. Cover images come from the Media Library URLs. Add media under the new `Blog` folder, copy/select the URL in the blog editor, and publish the article.
