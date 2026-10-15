# Spatial buffer runtime

Browser-only dependency bundle: @turf/buffer 7.4.0 and JSTS 2.12.1 geometry validity checking. Distributed under the included MIT, ISC/BSD and EDL/EPL notices in LICENSES.txt. JSTS offers EDL-1.0 OR EPL-1.0.

Upstream: https://turfjs.org/docs/api/buffer and https://github.com/bjornharrtell/jsts/tree/2.12.1 . Exact resolved package versions and registry integrity hashes are recorded in dependency-lock.json. No network or account code is included in the entry module.

Rebuild from the repository root:

```
npm install --prefix outputs/buffer-build --no-audit --no-fund @turf/buffer@7.4.0 jsts@2.12.1 esbuild@0.28.2
node scripts/build-spatial-buffer.cjs
```

The committed entry module is scripts/spatial-buffer-vendor.mjs. The install prefix, node_modules and intermediate files stay ignored. The bundle is a runtime asset served by this static website.

Turf projects each source to a local spherical azimuthal equidistant plane, applies the JSTS buffer, then projects back. The demo uses 16 segments per quadrant. This is not a claim of equality with MapNero's native WGS84/Clipper calculation. The wrapper rejects invalid topology, wide extents, polar/date-line sources and oversized batches. Buffer results are XY; the original source including XYZ and properties is retained as metadata.
