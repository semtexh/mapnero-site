# Buffer guide capture evidence — 2026-09-16

## Delivered locally

- Dedicated `buffer-workflow` guide topic, five steps, in all twelve supported
  languages for Apple and Android. Existing measurement media is preserved.
- Twelve actual Android screenshots at 1080 × 2400, captured by the Flutter
  integration-test screenshot API from the production Library, feature card and
  Buffer sheet. These are emulator screenshots, **not physical-phone evidence**.
- Languages: en, tr, ar, de, es, fr, hi, it, pt, ru, uk, ur.
- Apple instructions were checked against source. English has two iOS simulator
  captures of the Buffer panel (workflow and fill/opacity); Spanish has an iOS
  simulator capture of the localized feature-detail entry point where Buffer is
  selected. The remaining exact-locale Apple Buffer-panel captures and all
  physical-device acceptance are still outstanding. No Android image substitutes
  for an Apple screenshot.

## Reproduction and isolation

Source: `semtexh/mapnero`, branch `claude/new-session-6waeuz`; the capture harness
is `mapnero_flutter/integration_test/guide_buffer_capture_test.dart` with driver
`test_driver/guide_capture_driver.dart`. See source `docs/GUIDE_DEVICE_CAPTURE.md`.

Dedicated Pixel 7 emulator, API 37, read-only AVD session. The app uses synthetic
Boston points and in-memory preferences. Production startup is not invoked;
Supabase uses an empty session, loopback URL and a no-I/O offline HTTP client.
No physical phone, existing user data, live account, production server or
commercial subscription was changed.

The passing full run took 1 minute 52 seconds after build/installation. Each
locale opened Library → Layers → Guide Observations → Survey Point 10 → Buffer,
entered a sample output name, selected cyan, previewed, then created a 50 m
buffer. Runtime assertions verified:

1. Preview leaves stored features unchanged.
2. Create adds one feature with the requested name, cyan fill and 50 m distance.
3. The success message disappears without a tap.
4. The feature card closes using its own close button.
5. Arabic/Urdu layout direction is RTL; the final return to English is LTR.
6. No Flutter widget exception is left after these steps.

The test reports one workflow test plus its teardown as `+2: All tests passed`;
this is not a claim of two independent workflow tests. Persistence here means
in-memory preferences, not disk durability. Multi-feature geometry, edited
buffers, landscape, GPS, native iOS and field acceptance are separate checks.

## Visual review

All twelve PNGs were individually opened and inspected. Each shows the correct
localized Buffer screen, preview count, selected cyan swatch, 22% opacity and
the full create button. No keyboard, error overlay, clipped action or overflow
stripe was visible. Arabic and Urdu correctly mirror the layout. The editable
sample name remains `Demo buffer 50 m` deliberately; it is user data, not a UI
translation. Existing selected-unit grey-on-yellow contrast remains a separate
UI-polish consideration; it was not retouched in these images.

## Boundaries

Focused checks: 23 Flutter fixture/form/geometry tests passed; analysis of the
four capture-related Dart files was clean. All 45 site guide tests passed.
Chrome at 390 × 844 loaded exact-locale PNGs in Turkish, English, Arabic and
Urdu, with no horizontal page overflow. Urdu → English reset RTL to LTR.
The complete Turkish page was visually reviewed. The Apple Buffer topic uses an
exact-locale capture only where one exists; it does not display an Android or
wrong-language fallback. Viewport overrides were reset afterward.

An initial browser load logged an existing `Missing Android 3D guide: en`
error and omitted route topics; a reload showed all 18 Android topics and no
repeat of that application error. This observation is recorded for follow-up,
not claimed as fixed by the Buffer package. A separate browser-extension error
is not an app result.

This is one completed guide topic, not completion of the entire guide or the
mobile roadmap. No production/site deployment or store submission is included.
