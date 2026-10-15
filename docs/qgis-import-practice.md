# Local QGIS and KMZ import practice

The actual Web import-menu capture links to a working local package review. This marketing preview does not submit records to a MapNero account.

A ZIP/QGZ must contain one QGS project with local OGR vector sources. The reader resolves the project's actual GeoJSON and GeoPackage references, including named GeoPackage tables; it never substitutes an `original.geojson` sidecar. Layer-tree views and initial visibility become explicit review checkboxes. Only confirmation changes the local preview. Cancel, invalid files and empty selection preserve the last confirmed dataset. The original package download preserves every byte.

This bounded reader supports WGS84 EPSG:4326 XY/XYZ geometry types 1–7. M dimensions, other source CRSs, raster/remote layers, curves and ambiguous sources are refused for separate review. Basic geometry styles are used on the map; QGIS styling is retained only in the original project package. Large SQLite integers are strings to preserve precision, binary values are explicit hex objects, and null/known zero values remain distinct. Limits: 10 MB archive, 20 MB expanded, 300 entries, 30 layer views, 10,000 features, 250,000 positions. The map latitude limit is explicit. No remote datasource is fetched.

KML/KMZ menu choices now distinguish vector data from raster overlays. A vector KMZ must contain exactly one supported KML. The existing raster importer handles image overlays separately. Both follow review before confirmation.

Validation on 2026-10-15:

- 412 automated checks passed, including seven QGIS/KMZ cases: actual export roundtrip with a deliberately misleading sidecar, independent GeoPackage XYZ/64-bit/null/binary attributes, local reference/CRS validation, nested QGZ, geometry corruption/M refusal, hidden-layer selection and vector-versus-raster KMZ validation.
- Actual browser flow: two layers reviewed; empty selection refused; only the selected point confirmed and downloaded with zero height retained. Original ZIP matched SHA-256 f2bed19f4144ae05c845ec4fbb52a9b7d53ec37e8910fe8430782039e273eb8f. A bad replacement file left the confirmed data intact.
- Menu-to-review route, cancel/reselect same file, both-layer confirmation and real map rendering checked at 390px; capture loaded, no horizontal overflow or console errors. This is responsive browser verification, not a physical phone test.
- Actual vector KMZ parsed, confirmed and rendered on the London street map. Evidence is local under outputs/qgis-import/ and is excluded from source commits.

The previous 73-card mobile route audit and focused workflow proofs remain separate evidence. Watch remains explicitly deferred by the user. No native-app modification, push or publication occurred.
