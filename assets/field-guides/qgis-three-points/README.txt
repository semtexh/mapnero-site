MapNero QGIS import sample

Three synthetic points in EPSG:4326 (WGS84). Choose one format for your first test. Each file contains the same records.

Name          Longitude  Latitude
Reference A   30.000     0.000
Reference B   30.001     0.001
Reference Ç   30.002     0.000

Fields: ref_id, name, status, notes.
ref_id: 1, 2 or 3.
status: sample.
notes: Synthetic example, not survey data.

Files exported with QGIS 3.44.15 on 28 October 2026:
- QGIS-GeoJSON-3points.geojson
- QGIS-GeoPackage-3points.gpkg
- QGIS-Shapefile-3points.zip

Keep the Shapefile ZIP intact so its companion files stay together.

Android: Library > + > Import GIS File > Auto-detect. Choose the file, then tap Done in the import summary. Compare the imported records with the coordinates and fields above. Close and reopen the app and check again.

GeoJSON is a Free format. GeoPackage and Shapefile imports require Core or higher. Check current in-app limits and the guide for your platform.

These files were checked with QGIS and an Android test build. This small point-layer example does not establish compatibility for other geometries, coordinate systems, styles or attachments.

Guide: https://www.mapnero.com/qgis-mobile-fieldwork.html#sample-files
