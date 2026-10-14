# Shapefile ZIP walkthrough

The real Android Add Map entry now opens a local ZIP reader with review,
confirmation, real MapLibre display and original/converted downloads.

Exactly one matching SHP/DBF/PRJ layer is required. Optional SHX offsets and
lengths are checked against each SHP record; CPG sets DBF decoding (default
Windows-1252 is reported). The source projection is validated separately with
proj4 before XY transformation to WGS84, so shpjs's invalid-PRJ fallback is never
used. Original ZIP bytes and Z values are unchanged.

Supported shapes: Point, PolyLine, Polygon, MultiPoint and Z forms. Null/mixed
shape records, M-only forms, deleted DBF rows, memo/binary fields and missing
PRJ require separate review/adapters. These remain pending requirements. Extra
measure data stays in the original source; it is not mapped into GeoJSON.
DBF strings, finite numbers, booleans, valid calendar dates and blank/null slots
stay row-aligned. Invalid members reject the whole batch before confirmation.

Limits: compressed ZIP10 MB, expanded package20 MB,300 entries,500 shapes,
20000 positions. Directory/header/CRC/path/companion/count/part/index/UTF-8 or
selected encoding checks precede confirmation. No network import is invoked.

The existing MapNero web npm dependencies shpjs6.2.0 and proj4 are vendored
locally with hash/version manifest and licenses, including bundled dependency
licenses. Only the binary shape parser is used, not its URL-fetching API.

Verified: actual browser uploads synthetic WGS84/Web Mercator PointZ ZIP,
review/confirm/map; independent download readback proves correct London XY,
zero Z, false, null values and original ZIP byte identity. Missing PRJ keeps
previous confirmed layer. Real binary host fixtures exercise six additional
shape/Z types and polygon holes. Mobile390×844 has scrollWidth390; no final
browser warnings/errors. Initial script loading order failed and was repaired
with ordered deferred scripts before the successful final browser checks.
291 full host tests pass. Source/native platform conversion parity, native
Android store write, physical/Safari touch, missing-PRJ user declaration,
multi-layer chooser and remaining M/memo/null/deleted adapters are unverified.
