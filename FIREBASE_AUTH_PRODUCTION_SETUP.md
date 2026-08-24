# Firebase production setup

1. Firebase Console → Authentication → Sign-in method → enable Email/Password.
2. Authentication → Users → Add user. Use the same email in `FIREBASE_ADMIN_EMAILS`.
3. Project settings → General → Web app: copy all `NEXT_PUBLIC_FIREBASE_*` values.
4. Project settings → Service accounts → generate a private key and configure the server-only `FIREBASE_*` values.
5. Enable Cloud Firestore and Firebase Storage.
6. Add `qyasat.sa` and `www.qyasat.sa` under Authentication → Settings → Authorized domains.
7. Set a long random `ADMIN_SESSION_SECRET`.
8. Restart/redeploy after changing environment variables.

All CMS content uses Firestore when Firebase Admin is configured. Media files use Firebase Storage. In production, CMS document writes fail clearly instead of silently writing to temporary local storage.
