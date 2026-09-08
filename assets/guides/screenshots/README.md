# Real guide captures

## 2026-09-08 — iOS import screen

- Source: installed MapNero app, iPhone 17 Pro simulator, iOS 27.
- Resolution: 1206 × 2622, unedited simulator PNG captures.
- Languages: en, tr, ar, de, es, fr, hi, it, pt, ru, uk, ur.
- Screen: `apple/<language>/import-map.png`.
- The app was relaunched in each language. Capture automation waited for the
  corresponding localized map-source heading in the live accessibility tree.
- Arabic and Urdu captures use the app's real right-to-left layout.
- These are iPhone guide screenshots, not evidence of iPad, macOS, Android or web
  verification, and have not been uploaded to App Store Connect.

Coverage is intentionally partial. Missing topic/platform captures stay hidden;
the guide must not substitute another language's screenshot.

Run `node --test tests/guide-screenshots.test.cjs` for locale-selection, stale-load
and image-file checks. Visual review remains necessary for future captures.
