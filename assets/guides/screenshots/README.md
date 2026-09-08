# Real guide captures

## 2026-09-08 — iOS import and external GNSS screens

- Source: installed MapNero app, iPhone 17 Pro simulator, iOS 27.
- Resolution: 1206 × 2622, unedited simulator PNG captures.
- Languages: en, tr, ar, de, es, fr, hi, it, pt, ru, uk, ur.
- Screens: `apple/<language>/import-map.png` and `apple/<language>/team-gnss.png`.
- The app was relaunched in each language. Capture automation waited for the
  corresponding localized map-source heading in the live accessibility tree.
- Arabic and Urdu captures use the app's real right-to-left layout.
- These are iPhone guide screenshots, not evidence of iPad, macOS, Android or web
  verification, and have not been uploaded to App Store Connect.
- GNSS captures show the initial, disabled external-receiver switch, reached
  through the map's More menu. They do not demonstrate a connected receiver or
  a team session. No receiver was paired and no organization data was shared.
- Live browser checks verified all 12 import images, correct locale paths and
  RTL for Arabic/Urdu. Mobile grid sizing was corrected to prevent the horizontal
  topic strip from expanding and clipping the article.

Coverage is intentionally partial. Missing topic/platform captures stay hidden;
the guide must not substitute another language's screenshot.

## Quick-start capture procedure

`apple/<language>/quick-start.png` is available in all twelve languages above.
Together with import and initial GNSS screens this is 36 reviewed iPhone
captures. All twelve quick-start images were loaded in the local guide browser
with the matching locale path and 1206-pixel natural width; Arabic and Urdu
used RTL. Five automated tests pass. Other topics and devices remain pending.

The Simple Map introduction uses the real first-run mode picker. Temporary
launch arguments show that screen without deleting maps, signing out, or
changing the user's selected mode. Its localized heading and Simple Map card
are checked before capture; every final image also requires visual review.
Simulator startup may temporarily return an empty accessibility tree or a black
frame. Those frames are rejected, not used as guide illustrations. The skip
button still says "General" in this build; the first card is Simple Map.

Run `node --test tests/guide-screenshots.test.cjs` for locale-selection, stale-load
and image-file checks. Visual review remains necessary for future captures.

## Measurement and recording controls — 2026-09-08

Added `measure-cogo-buffer.png` and `location-track.png` for all twelve
languages: 24 individually reviewed captures, bringing the iPhone total to 60.
These use the same unedited simulator capture format and exact-locale lookup.

- Measurement captures show one temporary ruler point, a live line to the
  crosshair and a nonzero length label. The measurement was cancelled after
  capture. This illustrates distance measurement, not COGO or buffer creation,
  and is not a survey-accuracy validation.
- Recording captures show the initial recording controls, including pause and
  square Stop. The simulator was stationary, so distance and speed are zero.
  They do not demonstrate a moving track or background recording. Every demo
  recording was stopped before changing language. Short empty demo records may
  remain in the simulator; no personal tracks or app database were published.
- Apple instructions in all twelve languages now describe square Stop and
  automatic saving, matching the actual UI and recorder implementation. There
  is no separate review-and-save screen in this flow. Android text is unchanged.

Seven automated screenshot tests cover the five topics. iPad, macOS, Android,
web and the remaining iPhone topics still need their own capture verification.
All 24 new topic/language combinations were also checked in the running local
guide: exact image path, 1206-pixel natural width, and RTL for Arabic/Urdu.
