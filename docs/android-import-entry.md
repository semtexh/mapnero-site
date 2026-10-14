# Android Add Map practice entry — 14 October 2026

The existing real 1080×2400 Android menu capture now has connected PDF, KMZ,
Photo, Link and QR PNG controls. The shared local browser raster pipeline
previews, saves and downloads supported files; it does not install them in
Android or reproduce every native format implementation.

Verified in the rendered browser:

- PDF button rejects PNG. Owned one-page London GeoPDF renders its EPSG:4326
  viewport (804×682) and saves in the walkthrough.
- Owned synthetic KMZ bundles the 120×120 app icon with explicitly invented
  London bounds. Parsed corners and a selected image point are displayed.
  Download is byte-identical: SHA256
  `1a8f823d1aebb70db5313ba80569e8e8d13b5f15df7c28182b082fbc68bdb9f7`.
- Photo button reads the PNG without inventing coordinates.
- QR PNG control reads the existing London capture URL and does not download
  automatically. Link button focuses the reviewed URL field; explicit local
  London image download/preview/save succeeds without invented georeference.
- General file picker clears a prior PDF-specific selection restriction.
- Five visible menu targets are 44px high at 390×844, with scrollWidth 390.
  Source capture dimension override is 1080×2400, not the older default 2340.
- Full tests: 275 pass. No browser errors/warnings in the verified flow.

GeoJSON now has its own real-entry frame and local parse/review/confirm/map flow.
All six geometry types and source attributes are retained; invalid batches reject
without replacing the confirmed layer. The original download is byte-identical.
The native Android parse-summary capture and model conversion remain unverified.
Full suite after this addition: 280 pass.

Pending requirements are preserved: other vector formats,
OGC services, actual Android Open with intent, newer native GeoTIFF menu capture
and physical/Safari touch acceptance. This entry is partial, not whole-feature
acceptance. The native checklist Save and authenticated account captures are
still waiting for a usable Simulator UI or user action.
