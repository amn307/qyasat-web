# CMS functionality fix

The application now uses three storage modes:

1. Firebase Firestore and Firebase Storage when the Firebase environment variables are configured.
2. Normal project-local JSON/upload storage during local development.
3. Writable `/tmp/qyasat-cms` runtime storage on serverless production when Firebase is missing, preventing all admin save/upload actions from failing.

For durable production persistence, configure the four Firebase variables listed in `.env.example`. Serverless `/tmp` storage is temporary and can be reset by the hosting platform.

Additional fixes:
- Contact messages support local create, list, update, and delete.
- Analytics events support local collection and reporting.
- Production media upload/delete no longer fail solely because Firebase Storage is absent.
- The exposed example private key was removed from `.env.example`. Any real key that was previously committed should be revoked and replaced in Firebase.
