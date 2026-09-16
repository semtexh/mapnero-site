# Real guide captures

## Apple pins and layers — 2026-09-16

- Added twelve unedited `apple/<language>/pins-layers.png` screenshots from
  the current iPhone 17 Pro simulator build at 1206 × 2622. Each image opens
  the built-in Base Map, then the Layers panel, after selecting that exact
  in-app language.
- The frames show linked layers, their feature counts and the localized layer
  search field. Arabic and Urdu are real right-to-left captures. Every final
  image was checked against the live accessibility tree; the screenshots do
  not claim that every layer type is writable or that a field edit succeeded.
- A guide regression test requires all twelve full-resolution, distinct files
  and does not use one language as a fallback for another.

## Android external GNSS settings — 2026-09-16

- Added twelve unedited `android/<language>/team-gnss.png` screenshots from
  a physical Samsung SM-A175F running the current debug app build. The native
  screen is 1080 × 2340, so these intentionally retain that device's actual
  height instead of being padded or reused from the earlier 1080 × 2400
  emulator captures.
- Each image was captured after selecting its exact in-app language and shows
  Settings → Location & Navigation with the external GNSS receiver disabled
  and the phone's internal GPS as the source. Arabic and Urdu are real RTL
  frames; the device was restored to English after the capture set.
- These frames demonstrate the initial GNSS configuration only. They do not
  demonstrate a paired receiver, a live Team Session, a field location fix,
  or Android/iOS feature parity. The screenshot test requires all twelve
  distinct, full-resolution files.

## Apple Atlas still frames — 2026-09-12

- Added one `collections-atlas.png` for each of the twelve Apple guide
  languages. Every image is an unedited 1206 × 2622 frame extracted at the
  same point from that locale's previously verified real-app Atlas video.
- The frames show the localized Library and the three-sheet Kuwait Atlas
  collection. Arabic and Urdu retain the real right-to-left layout.
- The screenshot test now requires twelve distinct, full-resolution Atlas
  PNGs. These still frames inherit the scope of the source walkthrough: they
  demonstrate the collection setup, not field GPS switching or Android parity.

## Apple Atlas walkthrough — 2026-09-10

- Added one exact-language `collections-atlas.mp4` workflow clip for each of
  the twelve supported Apple guide languages. The clips use the app's real
  1206 × 2622 iPhone frames and show the active atlas sheet changing beneath
  the centre crosshair while the view scale is retained.
- All twelve clips are H.264 at 12 fps and full iPhone capture resolution.
  Eleven run for 31 seconds; the Turkish clip runs for 36 seconds so its
  localized guidance remains readable.
- Live guide verification loaded and autoplayed every exact-language clip with
  its matching caption. Arabic and Urdu used RTL; every locale had zero
  horizontal page overflow. No locale falls back to an English video.
- These clips demonstrate Apple atlas browsing only. They do not prove GPS
  auto-switch, offline source generation, Android parity, or every overlap and
  priority edge case.

## Apple manual-reference Library state — 2026-09-09

- Added twelve `apple/<language>/photo-georeference.png` captures from the
  iPhone simulator at 1206 × 2622. Each uses the app's localized Library view.
- The controlled sample map uses four independently verified GeoTIFF corner
  coordinates and an RMSE of 0 m; it is a test fixture, not a claim that an
  arbitrary historical illustration has been georeferenced.
- The Library's `MAN` badge and localized “manually referenced” status are
  visible. Arabic and Urdu were checked as RTL layouts.

## Android mode picker — 2026-09-08

- Added twelve unedited `android/<language>/quick-start.png` captures from the
  same Pixel 7 emulator / 2.1.5 (2057) build described below.
- Reached through Settings → Usage Mode, after selecting each language in the
  app. The localized heading was verified before capture; all twelve PNGs were
  individually reviewed, including Arabic/Urdu RTL and long wrapped headings.
- These show the mode chooser and Simple Map card, not the map viewer itself.
  No paid mode was activated. The lower skip button still uses General wording.
- Current total: 96 iPhone + 24 Android = 120 real captures. Remaining Android
  map-tool screens, iPad, Mac and web captures are not complete.

## Android Add Map — 2026-09-08

- Twelve unedited `android/<language>/import-map.png` captures from Pixel 7
  emulator, Android API 37, 1080 × 2400, MapNero 2.1.5 / 2057 debug build.
  Installed package version was checked after rebuilding with Java 17.
- Language was selected through Settings → General, then the library's Add
  button opened Add Map. Localized Import PDF labels were checked before capture.
  All twelve images were individually reviewed; Arabic and Urdu use real RTL.
- Light appearance is the app's current emulator setting. These demonstrate
  the source chooser, not successful parsing of every listed file type.
- Total saved screenshots: 96 iPhone + 12 Android = 108. Other Android topics,
  iPad, Mac and web still require their own captures.

## Saved-track report — 2026-09-08

- Added twelve unedited iPhone `track-report.png` captures; total: 96.
  Same simulator and resolution as below, app includes `57f9b0e`.
- Each language reached the saved synthetic track's report through More.
  First-visit help was dismissed and external location-query consent declined.
  Coordinate-only results completed without granting external-service access.
- All twelve images were individually reviewed. Urdu was scrolled slightly
  farther to show the full PDF button; the first report rows are above its viewport.
- The app-generated two-page Turkish PDF was rendered and visually inspected;
  the native share sheet also opened. No file was sent. This is sample layout
  and workflow verification, not validation of every track statistic or locale's PDF.
- Android, iPad, macOS and web captures remain separate pending work.

## Saved-track 3D viewer — 2026-09-08

- Added 12 unedited `apple/<language>/track-3d.png` captures, one per app
  language. Total real iPhone guide captures: 84. App includes `a4d763e`.
- iPhone 17 Pro / iOS 27 simulator, 1206 × 2622. Each app relaunch reached
  Layers → demo layer → saved demo track → 3D; localized title was verified
  in the live accessibility tree. Automatic rotation was stopped before capture.
- The approximately 255 m track was previously recorded using simulated
  coordinates. Its altitude is zero. The images demonstrate the viewer and
  controls, not real terrain elevation, navigation or field accuracy.
- All twelve images were individually inspected: complete track and start/end
  markers visible, controls readable. French Route Only wraps and makes its
  button taller than adjacent buttons; this cosmetic issue remains recorded.
- Arabic/Urdu mirror the rotation control to the left; guide wording now says
  the rotation button at the top, without an incorrect right-side instruction.
- 12 automated guide tests pass. Live browser checks confirmed exact-language
  image paths, natural width 1206, RTL, and no horizontal overflow at 621 px.
- This validates the short flat demo in portrait, not all camera modes,
  landscape, high-relief tracks, iPad/Mac or Android. No report/PDF capture,
  external-service consent or store submission was performed.

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

## Route creation — 2026-09-08

Added `route-builder.png` in all twelve languages: 12 individually inspected,
unedited 1206 × 2622 simulator captures, bringing the iPhone total to 72.
Each capture shows a localized route panel, two distinct demo waypoints, a
nonzero distance, and the connecting line. Drafts were closed after capture;
they were not saved as journeys and no GPS recording was started.

The elevation-sharing consent was declined. Missing heights correctly show
an em dash rather than a permanent loading indicator. These captures illustrate
manual route creation, not an elevation/3D result, navigation, or a successful
save-and-reopen test. Save instructions were checked against source code.
An initial zero-distance Spanish frame and an inconsistent Turkish test-map
frame were rejected and replaced before publishing these assets.

Eight screenshot tests now cover six topics; the separate route-content test
checks all twelve translations. Other platforms and the remaining iPhone
topics, including dedicated 3D and track-report walkthroughs, remain pending.
Local browser verification waited for each image to load and confirmed all
twelve exact-locale paths, natural width 1206, no horizontal page overflow,
and RTL for Arabic and Urdu.
