# Pixels injection fix

The public website now refreshes tracking settings from `/api/public/tracking` in the browser with `cache: no-store`.
This prevents the root layout from using stale/default tracking values after the admin saves IDs.

## Test

1. Save a valid Meta Pixel ID or Google tag ID in Admin > Pixels.
2. Restart `npm run dev` once after replacing the project.
3. Open `/en` or `/ar` and hard-refresh.
4. In the browser console run:
   - `document.querySelector('#qyasat-tracking-status')?.dataset.activeTrackers`
   - `typeof fbq`
   - `typeof gtag`
5. The first command should include the enabled tracker names. Meta should return `function`; GA4 should return `function`.
