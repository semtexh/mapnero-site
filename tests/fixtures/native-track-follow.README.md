Native reference generated 2026-10-14 by compiling the unchanged Foundation-only Swift sources with a JSON CLI wrapper.

Core/Geo/TrackProjection.swift: SHA256 95458357068a940b170a44939cd84cd07aada04ccbe68e94c8596bc7b991c0c9
Core/Geo/TrackNavigationSession.swift: SHA256 ccc2e41d9992b205d00d604ec32908877597f1fe676a8f9a8fad64d2cb463df2
UI/Features/ElevationMath.swift: SHA256 e31ef0d4650212c96ea081f8c2c226cea6550ce267b7e35ede982c0b1ce577f0

Eight synthetic scenarios cover forward/reverse, beginning approach, unknown heights, duplicate vertices, stale/out-of-order/poor fixes, pause/resume/stop/arrival, duplicate timestamps, retracing, date-line crossing and >64-segment groups. Numeric distance tolerance is 1 mm; coordinate tolerance 1e-8 degrees, fraction tolerance 1e-6. Small flat-minimum differences are floating point effects across Swift libm and JavaScript. GeographicLib independent GEO-01 anchors retain their original provenance in the separate JSON. Deviation alert evidence follows the accuracy-aware three-sample AND three-second rule in TrackNavigationManager.updateOffCourseState; speech is a browser adapter, not native audio.
