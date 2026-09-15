# Raster background guide — 2026-09-15

- Topic: `raster-background`; Apple and Android; en, tr, ar, de, es, fr,
  hi, it, pt, ru, uk, ur.
- Text describes georeferenced TIFF/PDF, More → Map Background, Basemap /
  Blank Canvas, background visibility, and Fit Map versus GPS Locate.
- Source references: MapNero `d9724b1` (iOS follow-up) and `b71309e`
  (Flutter background); a source commit does not establish store availability.
- `node --test tests/guide-*.test.cjs`: 39 passed. These validate data,
  loading contracts and existing asset structure, not device-screen meaning.
- Local browser: selected all 12 languages on each mobile platform; checked
  the localized topic heading, four steps and document direction. Arabic and
  Urdu were RTL; returning to English/Turkish restored LTR. Turkish narrow
  viewport screenshot was visually inspected. No console errors reported.
- No app screenshot/video was fabricated or reused for this topic. The
  existing missing-image behavior hides its absent capture. All 24 device
  captures remain pending: iPhone was unavailable and ADB list empty.
- Only local source/content changes. No deployment or store submission.
